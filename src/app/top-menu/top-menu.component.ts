import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { SidebarService } from '../sidebar/sidebar.service';
import { MenuService } from './menu.service';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss'],
  
})
export class TopMenuComponent implements OnInit {
  @ViewChild("openSidebarBtn") openSidebarBtn!:ElementRef;
  constructor(private sidebarSvc:SidebarService, private renderer:Renderer2, private menuSvc:MenuService) { }

  ngOnInit(): void {
    this.sidebarSvc.open.subscribe((val)=>{
      if(val === true){
        this.renderer.setStyle(this.openSidebarBtn.nativeElement, 'display', 'none')
      }else{
        try {
          this.renderer.setStyle(this.openSidebarBtn.nativeElement, 'display', 'block')
        } catch (error) {
          
        }
        
      }
    })
  }
  onOpenSidebarClick(){
    this.sidebarSvc.open.next(true)
  }
  scroll(target:string){
    this.menuSvc.target.next(target)
  }
}
