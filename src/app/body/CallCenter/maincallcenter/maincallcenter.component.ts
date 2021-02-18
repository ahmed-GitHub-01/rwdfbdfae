import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Anotherfile } from 'src/app/_models/anotherfile';
import { AutoNumber } from 'src/app/_models/autoNumber';
import { Main } from 'src/app/_models/Main';
import { NumberPhone } from 'src/app/_models/NumberPhone';
import { OldStatment } from 'src/app/_models/OldStatment';
import {
  PaginatedResultAnotherFile, PaginatedResultAutoNumber, PaginatedResultNumber,
  PaginatedResultOldStatment, PaginatedResultPay, PaginatedResultResom, PaginatedResultSearchByCivilId,
  PaginatedResultStatemnentSec, PaginatedResultStatment, PaginationAnotherFile, PaginationAutoNumber,
  PaginationCustomers, PaginationNumber, PaginationOldStatment, PaginationPay, PaginationResom,
  PaginationSearchByCivilId, PaginationStatemnentSec, PaginationStatment,
} from 'src/app/_models/pagination';
import { Pay } from 'src/app/_models/Pay';
import { Resom } from 'src/app/_models/resom';
import { SearchByCivilId } from 'src/app/_models/SearchByCivilId';
import { StatementSec } from 'src/app/_models/statementSec';
import { Statment } from 'src/app/_models/Statment';
import { AuthService } from 'src/app/_services/auth.service';
import { CallCenterService } from 'src/app/_services/callCenter.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-maincallcenter',
  templateUrl: './maincallcenter.component.html',
  styleUrls: ['./maincallcenter.component.css'],
})
export class MaincallcenterComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private modalService: BsModalService,
    private call: CallCenterService,
    private router: Router,
    private dialog: MatDialog,
    private titleService: Title
  ) { }
  @ViewChild('pdfViewer') public pdfViewer;
  modalRef: BsModalRef;
  blobBase: any = 'data:pdf;base64,';
  baseUrl = environment.apiUrl;
  maxSize = 3;
  maxSize2 = 10;
  way = [
    { id: 1, name: 'Choose...' },
    { id: 2, name: 'اتصال' },
    { id: 3, name: 'رسالة' },
    { id: 4, name: 'اتصال واتس' },
    { id: 5, name: 'رسالة واتس' },
    { id: 6, name: 'اتصال فيبر' },
    { id: 7, name: 'رسالة فيبر' },
    { id: 8, name: 'اتصال ايمو' },
    { id: 9, name: 'رسالة ايمو' },
    { id: 10, name: 'فاكس' },
    { id: 11, name: 'ايميل' },
  ];
  value1 = this.way[0];
  result = [
    { id: 1, name: 'Choose...' },
    { id: 2, name: 'وعد بالسداد' },
    { id: 3, name: 'تقسيط' },
    { id: 4, name: 'تاجيل متابعة' },
    { id: 5, name: 'رافض السداد' },
    { id: 6, name: 'مغلق / لا يرد' },
    { id: 7, name: 'مطلوب رقم 2' },
    { id: 8, name: 'لايوجد رقم' },
    { id: 9, name: 'شكوى' },
    { id: 10, name: 'مراجعة' },
    { id: 11, name: 'مماطل' },
    { id: 12, name: 'رفع الاجراءات' },
  ];
  value2 = this.result[0];
  customerUserNumber = [
    { value: 'العميل' },
    { value: 'الاب' },
    { value: 'الام' },
    { value: 'الزوج' },
    { value: 'الزوجة' },
    { value: 'الاخ' },
    { value: 'الاخت' },
    { value: 'العم' },
    { value: 'العمة' },
    { value: 'الخال' },
    { value: 'الخالة' },
    { value: 'الابن' },
    { value: 'الابنة' },
    { value: 'صديق' },
    { value: 'صديقة' },
    { value: 'جهة العمل' },
    { value: 'الشركة' },
    { value: 'الكفيل' },
    { value: 'الخادم' },
    { value: 'الخادمة' },
    { value: 'المنزل' },
    { value: 'السايق' },
    { value: 'المحامي' },
    { value: 'اخر' },
  ];
  customerUserNumberValue = this.customerUserNumber[0];
  numberResources = [
    { value: 'Choose...' },
    { value: 'stc' },
    { value: 'Ooredoo' },
    { value: 'Zain' },
    { value: 'Arcmate' },
    { value: 'Customer' },
    { value: 'Work' },
    { value: 'Contract' },
    { value: 'Phone Number' },
    { value: 'Talal' },
    { value: 'Related' },
    { value: 'Company' },
    { value: 'Goolge' },
    { value: 'Other' },
    { value: 'Old' },
  ];
  salaryWork = [
    { name: 'الإدارة العامة للإطفاء' },
    { name: 'الإدارة العامة للجمارك' },
    { name: 'وزارة الداخلية' },
    { name: 'اعانة طلابية' },
    { name: 'بدل سكن' },
    { name: 'دعم العمالة' },
    { name: 'القطاع الخاص' },
    { name: 'الإدارة العامة للطيران المدني' },
    { name: 'الإدارة المركزية للإحصاء' },
    { name: 'الأمانة العامة للأوقاف' },
    { name: 'الأمانة العامة لمجلس الوزراء' },
    { name: 'الحرس الوطني' },
    { name: 'الديوان الاميرى' },
    { name: 'التامينات الاجتماعية' },
    { name: 'شركة الصناعات الوطنيه' },
    { name: 'الفنادق' },
    { name: 'بنك التجاري' },
    { name: 'الخطوط الجوية الكويتية' },
    { name: 'وزارة الشئون' },
    { name: 'وزارة الكهرباء' },
    { name: 'مدارس خاصة' },
    { name: 'متقاعد مدني' },
    { name: 'متقاعد عسكري' },
    { name: 'شركة مطاحن الدقيق' },
    { name: 'شركة الانماء العقارية' },
    { name: 'خاص' },
    { name: 'جمعيات تعاونية' },
    { name: 'المؤسسة العامة للرعاية السكنية' },
    { name: 'التربية' },
    { name: 'اخرى' },
    { name: 'المجلس الأعلى للتخطيط والتنمية' },
    { name: 'المجلس الوطني للثقافة والفنون والآداب' },
    { name: 'القوى العاملة' },
    { name: 'الهيئة العامة لتقدير التعويضات عن خسائر العدوان العراقي' },
    { name: 'الهيئة العامة لشؤون ذوي الإعاقة' },
    { name: 'الهيئة العامة لشئون الزراعة والثروة السمكية' },
    { name: 'الهيئة العامة لشئون القصر' },
    { name: 'الهيئة العامة للبيئة' },
    { name: 'الهيئة العامة للرياضة' },
    { name: 'الهيئة العامة للشباب‏' },
    { name: 'الهيئة العامة للصناعة' },
    { name: 'طباعة القرأن' },
    { name: 'الهيئة العامة للغذاء' },
    { name: 'الهيئة العامة للقوى العاملة' },
    { name: 'الهيئة العامة للمعلومات المدنية' },
    { name: 'الهيئة العامة لمكافحة الفساد' },
    { name: 'الرعاية السكانية' },
    { name: 'جامعة الكويت' },
    { name: 'جهاز المراقبين الماليين' },
    { name: 'ديوان الخدمة المدنية' },
    { name: 'ديوان المحاسبة' },
    { name: 'مجلس الأمة' },
    { name: 'مساعدات الشؤون' },
    { name: 'الجامعة العربية المفتوحة' },
    { name: 'مؤسسة الموانئ الكويتية' },
    { name: 'هيئة الفتوى والتشريع' },
    { name: 'هيئة تشجيع الاستثمار' },
    { name: 'هيئة مشروعات الشراكة بين القطاعين العام والخاص' },
    { name: 'وزارة الاوقاف والشئون الإسلامية' },
    { name: 'وزارة الإعلام' },
    { name: 'وزارة التجارة والصناعة' },
    { name: 'وزارة الأشغال العامة' },
    { name: 'وزارة الخارجية' },
    { name: 'وزارة الدفاع' },
    { name: 'وزارة العدل' },
    { name: 'وزارة المالية' },
    { name: 'وزارة المواصلات' },
    { name: 'وزارة النفط' },
    { name: 'وكالة كونا' },

  ];
  valuesalaryWork = this.salaryWork[0];
  numberResourcesValue = this.numberResources[0];
  typeNumber = [{ value: 'Choose...' }, { value: 'Voice' }, { value: 'Data' }];
  typeNumberValue = this.typeNumber[0];
  statment = '';
  numberPhone = '';
  customer = '';
  resultCol = '';
  wayCol = '';
  pay: Pay[];
  noteStatment: any;
  main: any = {};
  Code: any;
  total: any = {};
  allstatement: Statment[];
  numbers: NumberPhone[];
  paginationPay: PaginationPay;
  paginationStatment: PaginationStatment;
  paginationNumber: PaginationNumber;
  newStatment: any = {};
  oldStatment: OldStatment[];
  paginationsOldStatment: PaginationOldStatment;
  anotherFile: Anotherfile[];
  paginationAnotherFile: PaginationAnotherFile;
  searchByCivil: SearchByCivilId[];
  paginationsearchByCivil: PaginationSearchByCivilId;
  statmentSec: StatementSec[];
  paginationStatmentSec: PaginationStatemnentSec;
  customers: Main[];
  paginationCustomer: PaginationCustomers;
  autoNumber: AutoNumber[];
  paginationAutoNumber: PaginationAutoNumber;
  customerCases: any = {};
  numbrtoedit: any = {};
  numbersForUpdateOrSave: any = [];
  idNumber: number;
  nextProcess: any = {};
  civilId: any;
  filterToSearch: any;
  caseCustomer = [];
  valueCaseCustomers = this.caseCustomer[0];
  caseTwasol = [];
  valueCaseTwasol = this.caseTwasol[0];
  caseDkhlia = [];
  valueCaseDkhlia = this.caseDkhlia[0];
  caseTawon = [];
  valueCaseTawon = this.caseTawon[0];
  caseCivilId = [];
  valueCaseCivilId = this.caseCivilId[0];
  caseMotabaa = [];
  valueCaseMotabaa = this.caseMotabaa[0];
  customerApproved = [];
  valuecustomerApproved = this.customerApproved['لم يتم القبول'];
  autoNumberToView: any = [];
  linkCompanyZain: any;
  textMessage: any;
  msgHideAndShow: any;
  subAutoNum: any = [];
  resom: Resom[];
  paginationResom: PaginationResom;
  uploadProces: any = [];
  displayedColumns: string[];
  installmentAmount = 0;
  installmentDate: Date;
  installmentShow = false;
  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.pay = data.pay.result;
      this.paginationPay = data.pay.pagination;
    });
    this.route.data.subscribe((data) => {
      this.allstatement = data.statment.result;
      this.paginationStatment = data.statment.pagination;
    });
    this.route.data.subscribe((data) => {
      this.numbers = data.numberPhone.result;
      this.paginationNumber = data.numberPhone.pagination;
    });
    this.route.data.subscribe((data) => {
      this.oldStatment = data.oldStatment.result;
      this.paginationsOldStatment = data.oldStatment.pagination;
    });
    this.route.data.subscribe((data) => {
      this.searchByCivil = data.anotherFile.result;
      this.paginationsearchByCivil = data.anotherFile.pagination;
    });
    this.route.data.subscribe((data) => {
      this.anotherFile = data.searchByCivilId.result;
      this.paginationAnotherFile = data.searchByCivilId.pagination;
    });
    this.route.data.subscribe((data) => {
      this.statmentSec = data.secStatment.result;
      this.paginationStatmentSec = data.secStatment.pagination;
    });
    this.route.data.subscribe((data) => {
      this.customers = data.customers.result;
      this.paginationCustomer = data.customers.pagination;
    });
    this.route.data.subscribe((data) => {
      this.autoNumber = data.autonumber.result;
      this.paginationAutoNumber = data.autonumber.pagination;
    });
    this.route.data.subscribe((data) => {
      this.resom = data.resom.result;
      this.paginationResom = data.resom.pagination;
    });
    this.getCustomersForEmp();
    this.getCaseCustomer();
    this.getCaseTwasol();
    this.getCaseDkhlia();
    this.getCaseTawon();
    this.getCaseCivilId();
    this.getCaseMotaa();
    this.titleService.setTitle('التفاوض');
  }
  collectStatment(): void {
    if (this.resultCol === 'تقسيط') {
      this.statment = this.wayCol + ' على الرقم ' + this.numberPhone + ' ويخص : ' + this.customer + ' / '
        + this.resultCol + ' بمبلغ ' + this.installmentAmount + ' د.ك بتاريخ '
        + this.installmentDate.toDateString();
    } else if (this.resultCol === 'وعد بالسداد') {
      this.statment = this.wayCol + ' على الرقم ' + this.numberPhone + ' ويخص : ' + this.customer + ' / ' +
        this.resultCol + ' مبلغ ' + this.installmentAmount + ' ' + 'د.ك';
    } else {
      this.statment = this.wayCol + ' على الرقم ' + this.numberPhone + ' ويخص : ' + this.customer + ' / ' + this.resultCol;
    }
  }
  wayChanged(): void {
    if (this.value1.name !== 'Choose...') {
      this.wayCol = this.value1.name;
    }
    this.collectStatment();
  }
  resultChanged(installment): void {
    if (this.value2.name !== 'Choose...') {
      this.resultCol = this.value2.name;
    }
    if (this.value2.name === 'تقسيط') {
      this.installmentShow = true;
      this.openModelInstallment(installment);
    } else if (this.value2.name === 'وعد بالسداد') {
      this.installmentShow = false;
      this.openModelInstallment(installment);
    } else {
      this.resultCol = this.value2.name;
      this.collectStatment();
    }
  }
  numberSelected(numbr: number, customer: string): void {
    this.numberPhone = numbr.toString();
    this.customer = customer;
    this.collectStatment();
  }
  pageChanged(event: any): void {
    this.paginationPay.currentPage = event.page;
    this.getPay();
  }
  pageChangedStatment(event: any): void {
    this.paginationStatment.currentPage = event.page;
    this.getStatement();
  }
  pageChangedOldStatment(event: any): void {
    this.paginationsOldStatment.currentPage = event.page;
    this.getOldStatement();
  }
  pageChangedSearchByCivilId(event: any): void {
    this.paginationsearchByCivil.currentPage = event.page;
    this.searchByCivilId(this.civilId, this.filterToSearch[0].SearchBy);
  }
  pageChangedNumber(event: any): void {
    this.paginationNumber.currentPage = event.page;
    this.getNumbers();
  }
  pageChangedAnotherFile(event: any): void {
    this.paginationAnotherFile.currentPage = event.page;
    this.getAnotherFile();
  }
  paginationChangedStatmentSec(event: any): void {
    this.paginationStatmentSec.currentPage = event.page;
    this.getStatementSec();
  }
  pageChangedCustomer(event: any): void {
    this.paginationCustomer.currentPage = event.page;
    this.getCustomersForEmp();
  }
  pageChangedAutoNumber(event: any): void {
    this.paginationAutoNumber.currentPage = event.page;
    this.getAutoNumber();
  }
  pageChangedResom(event: any): void {
    this.paginationResom.currentPage = event.page;
    this.getResom();
  }
  getMain(): void {
    this.auth.getMain(this.Code).subscribe(
      (res: any) => {
        if (res == null) {
          this.main = {};
          this.pay = [];
          this.allstatement = [];
          this.numbers = [];
          this.newStatment = [];
          this.oldStatment = [];
          this.toastr.error('لا يوجد عميل');
        } else {
          this.main = res;
          this.valueCaseCustomers = this.main.khesmCase;
          this.valueCaseTwasol = this.main.twasol;
          this.valueCaseDkhlia = this.main.dkhlia;
          this.valueCaseTawon = this.main.tawon;
          this.valueCaseCivilId = this.main.caseCivilID;
          this.valueCaseMotabaa = this.main.motabaa;
          this.valuecustomerApproved = this.main.approve_;
          this.valuesalaryWork = this.main.salaryWork;
          if (this.main.codClint === 12100003) {
            this.linkCompanyZain = 'https://www.kw.zain.com/en/web/zain-kuwait-website/quickpaylogout?m=' + this.main.contracT_NUM;
          } else {
            this.linkCompanyZain = '';
          }
          this.autoNumberToView.content = '';
        }
        // tslint:disable-next-line:no-shadowed-variable
      }, (error: any) => {
        this.toastr.error(error);
      }, () => {
        this.getPay();
        this.getStatement();
        this.getNumbers();
        this.getOldStatement();
        this.getAnotherFile();
        this.getStatementSec();
        this.getAutoNumber();
        this.getResom();
        this.getUploadProces();
        this.toastr.success('Done !');
      }
    );
  }
  getStatement(): void {
    this.auth.getStatment(
      this.Code,
      this.paginationStatment.currentPage,
      this.paginationStatment.itemsPerPage
    ).subscribe(
      (res: PaginatedResultStatment<Statment[]>) => {
        this.allstatement = res.result;
        this.paginationStatment = res.pagination;
      }, (error: any) => {
        this.toastr.error(error);
      }, () => { }
    );
  }
  getPay(): void {
    this.auth.getPay(
      this.Code,
      this.paginationPay.currentPage,
      this.paginationPay.itemsPerPage
    ).subscribe(
      (res: PaginatedResultPay<Pay[]>) => {
        this.pay = res.result;
        this.paginationPay = res.pagination;
      }, (error) => {
        this.toastr.error(error);
      }
    );
  }
  getNumbers(): void {
    this.auth.getNumber(
      this.main.civiL_ID,
      this.paginationNumber.currentPage,
      this.paginationNumber.itemsPerPage
    ).subscribe(
      (res: PaginatedResultNumber<NumberPhone[]>) => {
        this.numbers = res.result;
        this.paginationNumber = res.pagination;
      }, (error) => {
        this.toastr.error(error);
      }
    );
  }
  saveStatement(nextProcess): any {
    if (this.noteStatment != null) {
      this.newStatment.NOTE = this.statment + ' ' + this.noteStatment;
    } else {
      this.newStatment.NOTE = this.statment;
    }
    this.newStatment.NUMBER = this.numberPhone;
    this.newStatment.HAVE = this.customer;
    this.newStatment.WAY = this.value1.name;
    this.newStatment.CONNECT = this.value2.name;
    this.newStatment.CIVIL_ID = this.main.civiL_ID;
    this.newStatment.NEXT_PROCESS = nextProcess;
    this.newStatment.DATE_EVENT = new Date().toLocaleString('en-US', { timeZone: 'Asia/kuwait' });
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.anotherFile.length; i++) {
      if (this.anotherFile[i].clintNumber === this.main.codClint) {
        if (this.auth.decodedToken.unique_name[2] === 'SEC' ||
          this.auth.decodedToken.unique_name[2] === 'ADMIN' ||
          this.resultCol === 'تاجيل متابعة') {
          this.newStatment.CODE = this.anotherFile[i].code;
          this.newStatment.WAY = 'سكرتارية';
          this.newStatment.CONNECT = '';
          this.newStatment.NUMBER = 0;
          this.newStatment.HAVE = 0;
          this.saveFinalStatement();
        } else if (this.resultCol === 'مطلوب رقم 2' || this.resultCol === 'لايوجد رقم') {
          this.newStatment.CODE = this.anotherFile[i].code;
          this.newStatment.WAY = '';
          this.newStatment.CONNECT = '';
          this.newStatment.NUMBER = 0;
          this.newStatment.HAVE = 0;
          this.saveFinalStatement();
        } else {
          this.newStatment.CODE = this.anotherFile[i].code;
          this.saveFinalStatement();
          this.towsolNumber(this.anotherFile[i].code);
          this.installments(this.anotherFile[i].code);
        }
      }
    }
  }
  saveFinalStatement(): any {
    this.auth.saveStatment(this.auth.decodedToken.unique_name[0], this.newStatment).subscribe(() => {
      this.getStatement();
      this.toastr.success('The statement has been saved !');
    }, (error: any) => {
      // this.toastr.error(error);
      this.toastr.error('The Statement Was not Preserved !');
    });
  }
  towsolNumber(code: number): any {
    this.call.updateTowsolNumber(code, this.newStatment.twasolNumber,
      this.auth.decodedToken.unique_name[0]).subscribe(() => { }, (error: string) => {
        this.toastr.error(error);
      });
  }
  installments(code: number): any {
    if (this.resultCol === 'تقسيط') {
      this.call.updateInstallement(code, this.installmentAmount, this.installmentDate);
    } else if (this.resultCol === 'وعد بالسداد') {
      // this.call.updatePromise(code, this.installmentAmount, this.installmentDate);
    }
  }
  getOldStatement(): void {
    this.auth.getOldStatment(
      this.Code,
      this.paginationsOldStatment.currentPage,
      this.paginationsOldStatment.itemsPerPage
    ).subscribe((res: PaginatedResultOldStatment<OldStatment[]>) => {
      this.oldStatment = res.result;
      this.paginationsOldStatment = res.pagination;
    }, (error) => {
      this.toastr.error(error);
    });
  }
  getAnotherFile(): void {
    this.auth.getAnotherfile(
      this.main.civiL_ID,
      this.paginationAnotherFile.currentPage,
      this.paginationAnotherFile.itemsPerPage
    ).subscribe((res: PaginatedResultAnotherFile<Anotherfile[]>) => {
      this.anotherFile = res.result;
      this.paginationAnotherFile = res.pagination;
    }, (error) => {
      this.toastr.error(error);
    }, () => { }
    );
  }
  updateNumber(id, isVoke: number): void {
    if (id > 0) {
      this.call.updateNumber(id, isVoke).subscribe((next) => {
        this.toastr.success('Done !');
      }, error => {
        this.toastr.error('Faild on update !');
      }, () => {
        this.getNumbers();
      });
    }
  }
  openModelInstallment(template): any {
    this.modalRef = this.modalService.show(
      template,
      Object.assign(
        {},
        { class: 'modal-sm modal-dialog modal-dialog-centered' }
      )
    );
  }
  openModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(
      template,
      Object.assign(
        {},
        { class: 'modal-lg modal-dialog modal-dialog-centered' }
      )
    );
  }
  openModalNextProces(template: TemplateRef<any>): void {
    this.call.getNextProcess().subscribe((res: any) => {
      this.nextProcess = res;
    }, (error: string) => {
      this.toastr.error(error);
    }, () => {
      this.modalRef = this.modalService.show(
        template,
        Object.assign({}, { class: 'modal-m modal-dialog modal-dialog-centered' })
      );
    }
    );
  }
  getNumberToSaveOrUpdate(id): void {
    this.call.getNumberToSaveOrUpdate(id).subscribe(
      (res) => {
        this.numbersForUpdateOrSave = res;
        this.idNumber = id;
      }, (error) => {
        this.toastr.error(error);
      }, () => {
        this.customerUserNumberValue = this.numbersForUpdateOrSave.owner;
        this.numberResourcesValue = this.numbersForUpdateOrSave.resourse;
        this.typeNumberValue = this.numbersForUpdateOrSave.note;
      }
    );
  }
  saveNewNumber(): void {
    const numberUpdate: any = {};
    numberUpdate.CIVIL_ID = this.main.civiL_ID;
    numberUpdate.NUMBER = this.numbersForUpdateOrSave.phone;
    numberUpdate.OWNER = this.customerUserNumberValue;
    numberUpdate.NOTE = this.typeNumberValue;
    numberUpdate.RESOURSE = this.numberResourcesValue;
    numberUpdate.CIVIL_ID_USE = this.numbersForUpdateOrSave.civilIDUse;
    numberUpdate.DATE_ = new Date().toLocaleString('en-US', {
      timeZone: 'Asia/kuwait',
    });
    this.call.saveNewNumber(numberUpdate).subscribe((next) => {
    }, () => {
      this.getNumbers();
      this.toastr.success('Number has been Saved !');
      this.numbersForUpdateOrSave.content = '';
    });
  }
  EditNumber(): void {
    const numberUpdate: any = {};
    numberUpdate.NUMBER = this.numbersForUpdateOrSave.phone;
    numberUpdate.OWNER = this.customerUserNumberValue;
    numberUpdate.NOTE = this.typeNumberValue;
    numberUpdate.RESOURSE = this.numberResourcesValue;
    numberUpdate.CIVIL_ID_USE = this.numbersForUpdateOrSave.civilIDUse;
    numberUpdate.DATE_ = new Date().toLocaleString('en-US', {
      timeZone: 'Asia/kuwait',
    });
    this.call.updateNumbers(this.idNumber, numberUpdate).subscribe(() => {
      this.toastr.success('Number has been Updated !');
      this.getNumbers();
    }, (error) => {
      this.toastr.error(error);
    });
  }
  saveClassifications(): any {
    const classifications: any = {};
    classifications.KHESM_CASE = this.valueCaseCustomers;
    classifications.CASE_TOWASEL = this.valueCaseTwasol;
    classifications.DKHLEA_CASE = this.valueCaseDkhlia;
    classifications.MOHAD = this.main.mohad;
    classifications.CASE_MOTWASEL = this.valueCaseTawon;
    classifications.CASE_CIVIL_ID = this.valueCaseCivilId;
    classifications.EMP = this.auth.decodedToken.unique_name[0];
    if (classifications.MOHAD > 0) {
      // tslint:disable-next-line:triple-equals
      if (this.main.emp == 5555 || this.main.emp == 555 || this.main.emp == 666) {
        // tslint:disable-next-line:triple-equals
        if (this.auth.decodedToken.unique_name[2] == 'ADMIN' || this.auth.decodedToken.unique_name[2] == 'MSO') {
          this.call.updateClassifications(this.Code, classifications).subscribe(() => {
            this.toastr.success('Cases has been updated !');
          }, (error) => {
            this.toastr.error(error);
          });
        } else {
          this.toastr.error('لا يمكن تصنيف عميل ليس على قائمة العملاء الخاصة بك');
        }
      } else {
        // tslint:disable-next-line:triple-equals
        if (this.auth.decodedToken.unique_name[0] == this.main.emp) {
          this.updateClassifications(classifications);
        } else {
          this.toastr.error('لا يمكن تصنيف عميل ليس على قائمة العملاء الخاصة بك');
        }
      }
    } else {
      this.toastr.error('يجب ادخال الرقم الموحد');
    }
  }
  updateClassifications(classifications: any): any {
    // tslint:disable-next-line:triple-equals
    if (classifications.MOHAD > 0) {
      // const dialogRef = this.dialog.open(MatConfirmDialogComponent, {
      //   width: '300px',
      //   disableClose: false,
      // });
      // dialogRef.afterClosed().subscribe(result => {
      //   console.log(result);
      // });
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.anotherFile.length; i++) {
        if (this.anotherFile[i].clintNumber === this.main.codClint) {
          if (this.anotherFile[i].empNum === this.main.emp) {
            this.call.updateClassifications(this.anotherFile[i].code, classifications).subscribe(() => {
            }, (error) => {
              this.toastr.error('Cases hasn\'t been updated !');
            });
            // tslint:disable-next-line:triple-equals
            if (classifications.KHESM_CASE == 8 || classifications.KHESM_CASE == 4 || classifications.KHESM_CASE == 7
              // tslint:disable-next-line:triple-equals
              || classifications.CASE_TOWASEL == 25 || classifications.CASE_CIVIL_ID == 21 || classifications.CASE_CIVIL_ID == 28
              // tslint:disable-next-line:triple-equals
              || classifications.CASE_MOTWASEL == 30) {
              this.call.updateEmp(this.anotherFile[i].code, this.auth.decodedToken.unique_name[0]).subscribe(() => { });
            }
          }
        }
      }
      this.toastr.success('Cases has beem updated !');
    } else {
      this.toastr.error('يجب ادخال الرقم الموحد');
    }
  }
  searchByCivilId(civilId, filter: string): any {
    if (filter === 'name') {
      this.filterToSearch = 'searchByName';
      this.civilId = civilId;
    } else if (filter === 'civilID') {
      this.filterToSearch = 'searchByCivilId';
      this.civilId = civilId;
    } else if (filter === 'contract') {
      this.filterToSearch = 'searchByContract';
      this.civilId = civilId;
    } else if (filter === 'reasonDue') {
      this.filterToSearch = 'searchByReasonDue';
      this.civilId = civilId;
    }
    this.call
      .searchByName(
        this.civilId,
        this.filterToSearch,
        this.paginationsearchByCivil.currentPage,
        this.paginationsearchByCivil.itemsPerPage
      )
      .subscribe(
        (res: PaginatedResultSearchByCivilId<SearchByCivilId[]>) => {
          this.searchByCivil = res.result;
          this.paginationsearchByCivil = res.pagination;
          this.civilId = civilId;
          this.toastr.success('Done !');
        },
        (error) => {
          this.toastr.error(error);
        },
        () => { }
      );
  }
  searchBycode(code): any {
    this.Code = code;
    this.getMain();
  }
  getStatementSec(): void {
    this.call
      .getStatmentSec(
        this.main.code,
        this.paginationStatmentSec.currentPage,
        this.paginationStatmentSec.itemsPerPage
      )
      .subscribe(
        (res: PaginatedResultStatemnentSec<StatementSec[]>) => {
          this.statmentSec = res.result;
          this.paginationStatmentSec = res.pagination;
        },
        (error) => {
          this.toastr.error(error);
        }
      );
  }
  getCustomersForEmp(): void {
    this.call.customers(this.auth.decodedToken.unique_name[0]).subscribe((res: any) => {
      this.customers = res;
    }, error => {
      this.toastr.error(error);
    });
  }
  getCaseCustomer(): void {
    this.call.getCaseCustomer('حالة العميل').subscribe(res => {
      this.caseCustomer = res;
      this.caseCustomer.push({ code: 0, name: 'غير مصنف' });
      this.caseCustomer.push({ code: 3, name: 'غير مصنف' });
    }, error => {
      this.toastr.error(error);
    });
  }
  getCaseTwasol(): void {
    this.call.getCaseCustomer('حالة التواصل').subscribe(res => {
      this.caseTwasol = res;
      this.caseTwasol.push({ code: 0, name: 'غير مصنف' });
      this.caseTwasol.push({ code: 3, name: 'غير مصنف' });
    }, error => {
      this.toastr.error(error);
    });
  }
  getCaseDkhlia(): void {
    this.call.getCaseCustomer('حالة الدخلية').subscribe(res => {
      this.caseDkhlia = res;
      this.caseDkhlia.push({ code: 0, name: 'غير مصنف' });
      this.caseDkhlia.push({ code: 3, name: 'غير مصنف' });
    }, error => {
      this.toastr.error(error);
    });
  }
  getCaseTawon(): void {
    this.call.getCaseCustomer('حالة التعاون').subscribe(res => {
      this.caseTawon = res;
      this.caseTawon.push({ code: 0, name: 'غير مصنف' });
      this.caseTawon.push({ code: 3, name: 'غير مصنف' });
    }, error => {
      this.toastr.error(error);
    });
  }
  getCaseCivilId(): void {
    this.call.getCaseCustomer('حالة المدنية').subscribe(res => {
      this.caseCivilId = res;
      this.caseCivilId.push({ code: 0, name: 'غير مصنف' });
      this.caseCivilId.push({ code: 3, name: 'غير مصنف' });
    }, error => {
      this.toastr.error(error);
    });
  }
  getCaseMotaa(): void {
    this.call.getCaseCustomer('حالة المتابعة').subscribe(res => {
      this.caseMotabaa = res;
      this.caseMotabaa.push({ code: 0, name: 'غير مصنف' });
      this.caseMotabaa.push({ code: 3, name: 'غير مصنف' });
    }, error => {
      this.toastr.error(error);
    });
  }
  getAutoNumber(): void {
    this.call.getAutoNumber(this.Code, this.paginationAutoNumber.currentPage, this.paginationAutoNumber.itemsPerPage)
      .subscribe((res: PaginatedResultAutoNumber<AutoNumber[]>) => {
        this.autoNumber = res.result;
        this.paginationAutoNumber = res.pagination;
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < this.autoNumber.length; i++) {
          const auto = this.autoNumber[i].mainAutoNum;
          this.getSubAutoNumber(auto);
          this.autoNumberToView.push({
            id: this.autoNumber[i].id,
            mainAutoNum: this.autoNumber[i].mainAutoNum,
            subAutoNumber: 0,
            type: this.autoNumber[i].type,
            caseAuto: this.autoNumber[i].caseAuto,
            climent: this.autoNumber[i].climent,
            note: this.autoNumber[i].note
          });
        }
      }, (error) => {
        this.toastr.error(error);
      });
  }
  getSubAutoNumber(autoNumber: any): void {
    this.call.getSubAutoNumber(autoNumber).subscribe(res => {
      this.subAutoNum = res;
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.subAutoNum.length; i++) {
        this.autoNumberToView.push({
          id: this.subAutoNum[i].id,
          mainAutoNum: 0,
          subAutoNumber: this.subAutoNum[i].mainAutoNum,
          type: this.subAutoNum[i].type,
          caseAuto: this.subAutoNum[i].caseAuto,
          climent: this.subAutoNum[i].climent,
          note: this.subAutoNum[i].note
        });
      }
    });
  }
  copyInputMessage(inputElement: any): any {
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
    this.toastr.success('Copied');
  }
  getResom(): any {
    this.call.getResom(this.Code, this.paginationResom.currentPage, this.paginationResom.itemsPerPage)
      .subscribe((res: PaginatedResultResom<Resom[]>) => {
        this.resom = res.result;
        this.paginationResom = res.pagination;
      }, error => {
        this.toastr.error(error);
      }, () => {
        this.getUploadProcesLoop();
      });
  }
  getUploadProcesLoop(): any {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.uploadProces.length; i++) {
      this.resom.push({
        id: this.uploadProces[i].id,
        exp: this.uploadProces[i].exp,
        amount: this.uploadProces[i].amount,
        numK: this.uploadProces[i].numK,
        numOhda: this.uploadProces[i].numOhda,
      });
    }
  }
  getUploadProces(): void {
    this.call.getUploadProces(this.Code).subscribe(res => {
      this.uploadProces = res;
    });
  }
  goToPdf(id: string): void {
    this.call.getPDF(id).subscribe((response => {
      const byteCharacters = atob(response.openPdf);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: 'pdf/pdf' });
      if (navigator.msSaveOrOpenBlob) {
        const filename = this.main.civiL_ID + '.pdf';
        navigator.msSaveBlob(blob, filename);
      } else {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.setAttribute('visibility', 'hidden');
        link.download = this.main.civiL_ID + '.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }));
    // localStorage.setItem('id', id);
    // window.open('/showPdf', '_blank');
  }
}
