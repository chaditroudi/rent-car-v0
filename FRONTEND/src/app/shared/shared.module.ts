import { ToastService } from "./services/toast.service";
import { BaseModule } from "./../ui/base/base.module";
import { LoaderComponent } from "./components/loader/loader.component";
import { ContentComponent } from "./../layout/content/content.component";
import { FullComponent } from "./../layout/full/full.component";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { TranslateModule } from "@ngx-translate/core";
// Components
import { BreadcrumbComponent } from "./components/breadcrumb/breadcrumb.component";
import { FeatherIconsComponent } from "./components/feather-icons/feather-icons.component";
import { FooterComponent } from "./components/footer/footer.component";
import { HeaderComponent } from "./components/header/header.component";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { TapToTopComponent } from "./components/tap-to-top/tap-to-top.component";
// Header Elements Components
import { SearchComponent } from "./components/header/elements/search/search.component";
import { LanguagesComponent } from "./components/header/elements/languages/languages.component";
import { NotificationComponent } from "./components/header/elements/notification/notification.component";
import { BookmarkComponent } from "./components/header/elements/bookmark/bookmark.component";
import { MessageBoxComponent } from "./components/header/elements/message-box/message-box.component";
import { MyAccountComponent } from "./components/header/elements/my-account/my-account.component";

// Services
import { LayoutService } from "./services/layout.service";
import { NavService } from "./services/nav.service";
import { DecimalPipe } from "@angular/common";
import { SvgIconComponent } from "./components/svg-icon/svg-icon.component";
import { SwiperModule } from "swiper/angular";
import {
  ModalComponent,
  NgbdModalContent,
} from "../ui/base/modal/modal.component";
import { GeneratePdfDirective } from "./directives/generate-pdf.directive";
import { ConfirmationModalComponent } from "./components/confirmation-modal/confirmation-modal.component";
import { DecimalFormatDirective } from './directives/decimal-format.directive';
import { NumberInputDirective } from './directives/input-number.directive';
import { FilterPipe } from './pipe/filter.pipe';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    ContentComponent,
    ModalComponent,
    NgbdModalContent,
    BreadcrumbComponent,
    FullComponent,
    LoaderComponent,
    TapToTopComponent,
     SearchComponent,
    LanguagesComponent,
    NotificationComponent,
    BookmarkComponent,
    MessageBoxComponent,
    MyAccountComponent,
    FeatherIconsComponent,
    SvgIconComponent,
    GeneratePdfDirective,
    ConfirmationModalComponent,
    DecimalFormatDirective,
    NumberInputDirective,
    
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    TranslateModule.forRoot(),
    SwiperModule,
  ],
  providers: [NavService, LayoutService, DecimalPipe, ToastService],
  exports: [
    NgbModule,
    GeneratePdfDirective,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    ModalComponent,
    SearchComponent,
    DecimalFormatDirective,

    LoaderComponent,
    BreadcrumbComponent,
    TapToTopComponent,
    SvgIconComponent,
    SwiperModule,
    ConfirmationModalComponent,
  ],
})
export class SharedModule {}
