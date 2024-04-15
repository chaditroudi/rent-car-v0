import autoTable, { UserOptions } from 'jspdf-autotable';
import { Directive, ElementRef, HostListener, Input } from "@angular/core";
import jsPDF  from "jspdf";

import html2canvas from 'html2canvas';
import { Car } from 'src/app/core/models/car.model';




interface jsPDFWithPlugin extends jsPDF{
  autoTable: (options:UserOptions) => jsPDF;
}

@Directive({
  selector: "[appGeneratePdf]",
})


export class GeneratePdfDirective {
  constructor(private el: ElementRef) {}


  @HostListener('click') onClick() {


    this.generatePDF();
  }
  @Input()
  contentToConvert: any;


  @Input()
  printRented:any;


  @Input()
  dataR:Car[] = []

  

  generatePDF() {


    console.log(this.dataR)


    var printRented = document.getElementById(this.printRented);
    var data = document.getElementById(this.contentToConvert);


    if(printRented !== null) {

      const doc = new jsPDF('portrait','px','a4') as jsPDFWithPlugin;

      doc.autoTable({
        head: [['code', 'car','year', 'plate','daily']],
        body: this.dataR.map(object => {
          return [object.code, object.car, object.year, object.plate,object.daily];
        }),
      });

      doc.save('rented_car_reports.pdf');
    }


    else if(data ) {
      html2canvas(data).then(canvas => {
        const a4AspectRatio = 350 / 250;
        const canvasAspectRatio = canvas.width / canvas.height;
        let fileWidth, fileHeight;
    
        if (canvasAspectRatio > a4AspectRatio) {
          fileWidth = 210;
          fileHeight = (canvas.height * fileWidth) / canvas.width;
        } else {
          fileHeight = 297;
          fileWidth = (canvas.width * fileHeight) / canvas.height;
        }
    
        const fileURI = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const xPosition = (400 - fileWidth) / 2;
        const yPosition = (100 - fileHeight) / 2;
        
        // Resize the image
        const ratio = fileWidth / fileHeight;
        const newWidth = Math.min(fileWidth, fileHeight * ratio);
        const newHeight = Math.min(fileHeight, fileWidth / ratio);
        
        // Add the resized image to the PDF
        pdf.addImage(fileURI, 'PNG', xPosition, yPosition, newWidth, newHeight);
        pdf.save('report_rented_cars.pdf');
      });
    }




    

  
  }
}
