import { animate, state, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { SidebarService } from './sidebar.service';
import{BreakpointObserver} from '@angular/cdk/layout'
import { MenuService } from '../top-menu/menu.service';

@Component({
  selector: 'sidebar',
  templateUrl:'./sidebar.component.html',
  styleUrls:['./sidebar.component.scss'],
  animations: [
    trigger('slideAnim', [
      state('false', 
        style({ left: '-250px' })
      ),
      state('true', 
        style({ left:  '{{progressValue2}}%' }),  {params: {progressValue2: 1}}
        ),
      transition('false => true', [
        animate('1s')
      ]), 
      transition('true => false', [
        animate('0.6s')
      ])
    ])
  ]
})
export class SidebarComponent implements OnInit, AfterViewInit {
  @ViewChild('sidebarContainer', {static: false}) private sidebarContainer!:ElementRef<HTMLDivElement>;
  subs:Subscription = new Subscription;
  
  constructor(private el:ElementRef, private renderer:Renderer2, private sidebarSvc:SidebarService, 
    private bpObserver:BreakpointObserver, private menuSvc:MenuService) {
    this.sidebarSvc.open.subscribe((val)=>{
      if(val === true){
       
      }
    })
   }

  ngOnInit(): void {
    
  }

  ngAfterViewInit(){
    this.subs = this.bpObserver.observe(['(max-width: 500px)']).subscribe((res)=>{
      if(res.matches){ //screen is equal or smaller
        this.enlargeSidebar()
      }
      else{
        this.collapseSidebar()
      }
    })
    
  }
  onCloseBtnClick(){
    this.collapseSidebar();
  }
  enlargeSidebar(){
    this.sidebarSvc.open.next(true)
    this.renderer.setStyle(this.sidebarContainer.nativeElement, 'left', '0')
    this.renderer.setStyle(this.sidebarContainer.nativeElement, 'width', '100%')
    this.renderer.setStyle(this.sidebarContainer.nativeElement, 'box-shadow','none')
    this.renderer.setStyle(this.sidebarContainer.nativeElement, 'position', 'inherit')
    this.renderer.setStyle(this.sidebarContainer.nativeElement, 'height', '100vh')
  }
  collapseSidebar(){
    this.sidebarSvc.open.next(false)
    this.renderer.setStyle(this.sidebarContainer.nativeElement, 'left', '3px')
    this.renderer.setStyle(this.sidebarContainer.nativeElement, 'width', '250px')
    this.renderer.setStyle(this.sidebarContainer.nativeElement, 'box-shadow',' 1px 0px 20px #d3b719')
    this.renderer.setStyle(this.sidebarContainer.nativeElement, 'position', 'fixed')
    this.renderer.setStyle(this.sidebarContainer.nativeElement, 'height', 'calc(100% - 20px)')
    
  }
  scroll(target:string){
    this.menuSvc.target.next(target)
  }
 
}
