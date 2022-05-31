import { AfterViewInit, Component, DoCheck, ElementRef, HostListener, OnChanges, OnInit, Renderer2, ViewChild } from '@angular/core';
import { SidebarService } from '../sidebar/sidebar.service';
import { MenuService } from '../top-menu/menu.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit,AfterViewInit {
  @ViewChild('aboutContainer') aboutContainer!:ElementRef;
  @ViewChild('skillsContainer') skillsContainer!:ElementRef;
  @ViewChild('experienceContainer') experienceContainer!:ElementRef;
  //@ViewChild('landing_container') landing_container!:ElementRef;
  @ViewChild('contactContainer') contactContainer!:ElementRef;

  canScroll:boolean = true;
  @ViewChild('home_container') home_container!:ElementRef;
  containers = [
    //{Name:'landing', Index:0}, 
    {Name:'about', Index:1}, 
    {Name:'skills', Index:2}, 
    {Name:'experience', Index:3}, 
    {Name:'contact', Index:4}
  ];
  currentContainerIndex = 0;
  isDownScrolling : boolean = true;
  constructor(private menuSvc:MenuService, private renderer:Renderer2, private sidebarSvc:SidebarService) { 
  
  }
  // @HostListener('window:scroll', ["$event"])
  // public onScroll(event: Event) {
  //     setTimeout(() => {
  //       this.canScroll = true;
  //     }, 1000);
  //   if(this.canScroll === true){
  //     //this.aboutContainer.nativeElement.scrollIntoView({ behavior: "smooth"})
  //     this.aboutContainer.nativeElement.scrollTop = 0;
  //   }
    
  //   this.canScroll = false;
  // }

  ngOnInit(): void {
    
    // document.addEventListener('wheel', (event) => {
      
    //   if (!this.canScroll) {
    //     event.preventDefault()
    //     console.log('prevented')
    //     return; 
    //   }
      
    //   this.canScroll = false;
    //   // setTimeout(() => {
    //   //   this.canScroll = true;
    //   // }, 1000);
      
    //   this.isDownScrolling = event.deltaY > 1 ? true : false;
      
    //   let targetContainer:any ;
    //   if(this.isDownScrolling){
    //     targetContainer = this.containers.find(con => con.Index === this.currentContainerIndex + 1)
    //   }
    //   else{
    //     targetContainer = this.containers.find(con => con.Index === this.currentContainerIndex - 1)
    //   }
      
    //   console.log('target Cont: ',targetContainer)
    //   if(targetContainer){
    //     this.currentContainerIndex = targetContainer.Index;
    //     this.scroll(targetContainer.Name )
    //     console.log('scrolled!!!')
        
    //   }
    //   setTimeout(() => {
    //     this.canScroll = true;
    //   }, 1000);
     
      
     
      
    // });
    
  }
  ngAfterViewInit(): void {
    this.sidebarSvc.open.subscribe((val)=>{
      if(val === true){
        this.renderer.setStyle(this.home_container.nativeElement, 'width', '100%')
      }else{
        
        this.renderer.setStyle(this.home_container.nativeElement, 'width', 'calc(100% - 260px)')
      }
    })
    this.menuSvc.target.subscribe((val)=>{
      this.scroll(val)
    })
  }
 
  scroll(target:string){
    switch (target) {
      case 'about':
        //this.aboutContainer.nativeElement.scrollIntoView({ behavior: "smooth",block: 'center'})
        let about = document.getElementById('about_container')
        if(about)
        about.scrollIntoView({ behavior: "smooth",block: 'center'})
        break;
      
      case 'skills':
        this.skillsContainer.nativeElement.scrollIntoView({ behavior: "smooth",block: 'center'})
        break
      case 'experience':
        this.experienceContainer.nativeElement.scrollIntoView({ behavior: "smooth",block: 'center'})
        break
      case 'contact':
        this.contactContainer.nativeElement.scrollIntoView({ behavior: "smooth",block: 'center'})
        break
      default:
        //this.landing_container.nativeElement.scrollIntoView({behavior:"smooth",block: 'center'})
        break;
    }
    
    
  }

  scrollTop(target:string){
    switch (target) {
      case 'about':
        this.aboutContainer.nativeElement.scrollTop = '-100vh'
        break;
      
      case 'skills':
        this.skillsContainer.nativeElement.scrollIntoView({ behavior: "smooth",block: 'center'})
        break
      case 'experience':
        this.experienceContainer.nativeElement.scrollIntoView({ behavior: "smooth",block: 'center'})
        break
      case 'contact':
        this.contactContainer.nativeElement.scrollIntoView({ behavior: "smooth",block: 'center'})
        break
      default:
        //this.landing_container.nativeElement.scrollIntoView({behavior:"smooth",block: 'center'})
        break;
    }
  }
}
