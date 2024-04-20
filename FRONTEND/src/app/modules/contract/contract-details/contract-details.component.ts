import { ContractService } from "./../../../core/services/Contract.service";
import {
  Component,
  ElementRef,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from "@angular/core";

import { ModalComponent } from "src/app/ui/base/modal/modal.component";
import {
  NgbModalConfig,
  NgbModal,
  NgbNavChangeEvent,
} from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastService } from "src/app/shared/services/toast.service";
import { ConfirmationModalComponent } from "src/app/shared/components/confirmation-modal/confirmation-modal.component";
import { Contract } from "src/app/core/models/contract.model";
import { CarService } from "src/app/core/services/car.service";
import { Car } from "src/app/core/models/car.model";
import { createUpdatedContract } from "src/app/core/models/contract-update.model";
import { CarModalComponent } from "../../cars/car-modal/car-modal.component";
import { switchMap } from "rxjs";
import { DateService } from "src/app/shared/services/date.service";
import { SearchComponent } from "src/app/shared/components/header/elements/search/search.component";
import { CustomerModalComponent } from "../../customers/customer-modal/customer-modal.component";
import { CustomerService } from "src/app/core/services/customer.service";
import { Customer } from "src/app/core/models/customer.model";
import { ReportService } from "src/app/core/services/report.service";
import { Report } from "src/app/core/models";

@Component({
  selector: "app-contract-details",
  templateUrl: "./contract-details.component.html",
  styleUrls: ["./contract-details.component.scss"],
})
export class ContractDetailsComponent implements OnChanges, OnInit {
  public ContractData: any;

  formData = [];

  dateBC: string;

  features = [];
  status = "Contract is Open";
  modal: ModalComponent;

  ContractForm: FormGroup;
  carData = [];
  customerData = [];
  inputsValue: string[] = Array(33).fill("");
  selectedCarData: string;
  selectedCustomerData: string;

  isDisabled: boolean = false;

  etatForm = true;
  buttonAdd = "add new contract";

  Contract: any;
  newContract: Contract;

  carObject: Car;
  chossedCar: Car;
  car_id: any;
  selectedRadioValue = "";
  status_contract:string;

  checkboxItems = [
    { id: "chk-ani", label: "Spare wheel", checked: false },
    { id: "chk-ani1", label: "Wheel cover", checked: false },
    { id: "chk-ani2", label: "Tools & Jack", checked: false },
    { id: "chk-ani3", label: "Radio / Tape", checked: false },
    { id: "chk-ani4", label: "Fire Extinguisher", checked: false },
    { id: "chk-ani5", label: "First AID box", checked: false },
    { id: "chk-ani6", label: "Lights", checked: false },
    { id: "chk-ani7", label: "GPS", checked: false },
    { id: "chk-ani8", label: "Heater / AC", checked: false },
    { id: "chk-ani9", label: "Fuel panel", checked: false },
  ];
  selectedItems: string[] = [];

   reportData:Report ;
  onCheckboxChange() {
    this.selectedItems = this.checkboxItems
      .filter((item) => item.checked)
      .map((item) => item.label);

    console.log(this.selectedItems);
  }

  onCarBackEvent(checked) {
    this.isDisabled = checked;

    if (this.isDisabled) {
      this.status = "Contract is Closed";
    } else {
      this.status = "Contract is Open";
    }
  }

  ngOnInit(): void {




    this.discount = 0;
    this.payable = 0;
    this.advance = 0;
    this.loadData();
    this.fetchAllCustomers();
    this.fetchAllCars();
  }
  ngOnChanges(): void {
    this.loadData();
    this.fetchAllCustomers();
    this.fetchAllCars();
  }

  constructor(
    private router: Router,
    private carService: CarService,
    config: NgbModalConfig,
    private modalService: NgbModal,
    private readonly contractService: ContractService,
    private readonly reportService:ReportService,
    private toastr: ToastService,
    private formBuilder: FormBuilder,
    private customerService: CustomerService,
    private dateService: DateService
  ) {
    this.modal = new ModalComponent(config, modalService);
    this.initForm(formBuilder);
  }

  openSearchModal() {
    const modalRef = this.modalService.open(SearchComponent);
    modalRef.result.then(
      (result) => {
        console.log(result);
      },
      (reason) => {
        console.log(reason);
      }
    );
  }

  resetForm() {
    if (this.etatForm) {
      this.formData = [];
      this.buttonAdd = "cancel";
      this.etatForm = false;
      return this.ContractForm.reset();
    } else {
      this.buttonAdd = "add new contract";
      this.loadData();

      this.etatForm = true;
      return this.ContractForm.reset();
    }
  }

  initForm(formBuilder: FormBuilder) {
    this.ContractForm = formBuilder.group({
      serial: [null],
      version: [null, Validators.required],
      sponsor: ["", Validators.required],
      car: [""],
      owner: [null],
      car_out: [null],
      car_back: [null],
      select_one: ["", Validators.required],
      deposit: ["", Validators.required],
      location: ["", Validators.required],
      hirer: ["", Validators.required],
      comments: [""],
      daily: [null],
      monthly: [null],
      weekly: [null],
      annual: [null],
      fuel_out: [""],
      days: [""],
      no_km_out: [""],
      fuel_back: ["", Validators.required],
      no_km_back: ["", Validators.required],
      daily_val1: [0],
      daily_val2: [0],
      daily_result: [0],
      sum: [0],
      discount: [0],
      advance: [0],
      payable: [0],
    });
  }

  onChangeInputValue(event: Event, index: number) {
    const target = event.target as HTMLInputElement;

    this.inputsValue[index] = target.value;

    console.log(
      `inputValue: ${index + 1}  changed to : ${this.inputsValue[index]}`
    );
  }

  getContract(ContractId: number) {
    //current Contract:
    return this.contractService.get(ContractId).subscribe((res) => {
      this.Contract = res;
      console.log(res);
    });
  }

  async editContractAlert(value: any, ContractId: number) {
    if (value == "Yes") {
      this.updateContract(ContractId);
      console.log("first");
    }
  }


  updateContract(contractId: number) {
    this.contractService
      .get(contractId)
      .pipe(
        switchMap((res: Contract) => {
          this.status_contract =this.selectedRadioValue

          const updatedContract = createUpdatedContract(
            this.inputsValue,
            this.selectedCar && this.selectedCar._id
              ? this.selectedCar._id
              : res.car,
            this.selectedCus && this.selectedCus._id
              ? this.selectedCus._id
              : res.owner,
            this.selectedItems,
            this.status,

            this.status_contract,

            res
          );

          
           return this.contractService.update(contractId, updatedContract);

           
        })
      )
      .subscribe(
        async(response) => {
          console.log("res", response);

          // if(response.attempts) {
          //   this.toastr.showError("You cannot update contract more than 2 times");
          //   return;

          // }
          if (response) {

            if(response.attempts){
           
              return this.toastr.showError("You cannot update contract more than 2 times");

            }

            this.toastr.showSuccess("Contract updated successfully");

            this.loadData();
            return;
          } else {
            this.toastr.showError("Error in updating the Contract details");
            return;
          }
        },
        (error) => {
          console.error("Error in updating the Contract details:", error);
          this.toastr.showError("Error in updating the Contract details");
        }
      );
  }

  deleteContract(ContractId: number): void {
    this.contractService.delete(ContractId).subscribe(
      () => {
        this.loadData();
        this.toastr.showSuccess("Contract deleted successfully");
      },
      (err) => {
        console.error(err);
        this.toastr.showError("Error in deleting the Contract");
      }
    );
  }

  daily ="";
  weekly ="";
  monthly ="";
  annual ="";

  async chooseCar(carItem: Car) {
    this.selectedCarData =
      this.selectedCar.car +
      " " +
      this.selectedCar.year +
      " " +
      this.selectedCar.plate;

    console.log("car id ", this.selectedCar._id);

    this.daily = this.selectedCar.daily;
    this.weekly = this.selectedCar.weekly;
    this.monthly = this.selectedCar.monthly;
    this.annual = this.selectedCar.annual;



  }

  async chooseCustomer(cus: Customer) {
    this.selectedCustomerData = cus.fullName + " " + cus.mobile;

    console.log("customerrrrrrr", this.selectedCustomerData);

    this.ContractForm.controls["owner"].setValue(this.selectedCustomerData);
  }

  async fetchAllCars() {
    this.carService.getCars();

    this.carService.cars$.subscribe((res) => {
      this.carData = res;
    });
  }
  async fetchAllCustomers() {
    this.customerService.fetchAllCustomers();
    this.customerService.customers$.subscribe((res) => {
      this.customerData = res;
    });

    this.carService.cars$.subscribe((res) => {
      this.carData = res;
    });
  }
  async loadData() {
    this.contractService.getContracts();
    this.contractService.contracts$.subscribe((res) => {
      this.formData = res;

      this.formData.map((data) => {
        this.checkboxItems.map((item, index) => {
          if (data.features == item.label) {
            item.checked == true;
          }
        });
      });
    });
    [];
  }

  amount: any;
  price: any;
  result: any;
  advance: any;
  payable: any;
  discount: any;
  sum: any;
  async onChangeRadioValue(event: any, days, price) {
    let array = [];

    this.selectedRadioValue = event.target.value;

    let res = this.dateService.convertDaysToMWY(days, this.selectedRadioValue);

    if (this.selectedRadioValue == "daily") {
      this.amount = days;
      this.price = price;
    } else if (this.selectedRadioValue == "weekly") {
      this.amount = res;
      this.price = price;
    } else if (this.selectedRadioValue == "monthly") {
      console.log("res", res);

      this.amount = res;

      this.price = price;
    } else if (this.selectedRadioValue == "annual") {
      this.amount = res;
      this.price = price;
    }

    this.result = this.amount * this.price;
    this.payable = this.result - this.advance - this.discount;
    this.sum = this.result;
  }

  @ViewChild("payable") inputpayable: ElementRef;
  @ViewChild("advance") inputadv: ElementRef;
  @ViewChild("discount") inputdis: ElementRef;
  @ViewChild("sum") inputsum: ElementRef;

  finalRes: number = 0;
  noEditAlertModal :boolean = true;

  calculate() {
    if (this.inputsValue[26] == null || this.inputsValue[25] === null) {
      this.inputpayable.nativeElement.value = this.result;
    }
    this.inputpayable.nativeElement.value =
      this.result -
      this.inputadv.nativeElement.value -
      this.inputdis.nativeElement.value;

    this.inputsValue[27] = this.inputpayable.nativeElement.value;
    this.inputsValue[26] = this.inputadv.nativeElement.value;
    this.inputsValue[24] = this.inputsum.nativeElement.value;

    if ( parseInt(this.inputsValue[24]) ==0) {

      this.noEditAlertModal = true;
    }
   
  }

  @ViewChild("confirmationModal")
  private modalComponent!: ConfirmationModalComponent;

  @ViewChild("editContractModal")
  private editContractModal!: ConfirmationModalComponent;

  async openEditContractModal() {
    return await this.editContractModal.open();
  }

  async openModal() {
    return await this.modalComponent.open();
  }

  async getConfirmationValue(value: any, ContractId: number) {
    if (value == "Yes") {
      this.deleteContract(ContractId);
      console.log("first");
    }
  }

  async open() {
    this.openModal();
  }
  public active1 = 1;
  public active2 = 1;
  public active3 = 1;
  public active4 = 1;
  disabled = true;

  onNavChange1(changeEvent: NgbNavChangeEvent) {
    if (changeEvent.nextId === 4) {
      changeEvent.preventDefault();
    }
  }

  onNavChange(changeEvent: NgbNavChangeEvent) {
    if (changeEvent.nextId === 3) {
      changeEvent.preventDefault();
    }
  }

  goToHirer() {
    this.router.navigate(["/modules/customers/customers-list"]);
  }

  selectedCar: Car;
  selectedCus: Customer;

  async openCarModal() {
    // this.openSearchModal();
    const modalRef = this.modalService.open(CarModalComponent);
    modalRef.componentInstance.carData = this.carData;

    modalRef.componentInstance.carSelected.subscribe((selectedCar: Car) => {
      console.log(selectedCar);
      this.selectedCar = selectedCar;
      this.chooseCar(this.selectedCar);
    });
  }
  async openCustomerModal() {
    // this.openSearchModal();
    const modalRef = this.modalService.open(CustomerModalComponent, {
      size: "xl",
    });
    modalRef.componentInstance.customerData = this.customerData;

    modalRef.componentInstance.customerSelected.subscribe(
      (selectedCust: Customer) => {
        this.selectedCus = selectedCust;
        this.chooseCustomer(this.selectedCus);
      }
    );
  }

  goToInvoice(id: string) {
    return this.router.navigate([
      "/modules/contracts/contract-invoice",
      id,
      this.price,
    ]);
  }

  currentPage: number = 1;
  pageChanged(event: any) {
    this.currentPage = event.page;

    this.loadData();
  }
}
