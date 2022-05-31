import { Directive, HostListener, Renderer2 } from '@angular/core';
import { ElementRef } from '@angular/core';
import {
  AnimationPlayer,
  AnimationBuilder,
  AnimationMetadata,
  animate,
  style,
} from '@angular/animations';

@Directive({
  selector: '[toggleHeight]',
})
export class ToggleHeightDirective {
  player!: AnimationPlayer;
  displayed:boolean = false;
  constructor(private builder: AnimationBuilder, private el: ElementRef, private renderer:Renderer2) {
    this.renderer.setStyle(this.el.nativeElement, 'max-height', 0);
    this.renderer.setStyle(this.el.nativeElement, 'overflow', 'hidden');
  }

  private fadeIn(): AnimationMetadata[] {
    this.displayed = true;
    return [
      animate('2s ease-in-out', style({ maxHeight: '100vh'})),
    ];
  }

  private fadeOut(): AnimationMetadata[] {
    this.displayed = false;
    return [
      animate('1s ease-in-out', style({ maxHeight: '0'}))
    ];
  }
  @HostListener('window:scroll', ['$event'])
  isScrolledIntoView(){
    const rect = this.el.nativeElement.getBoundingClientRect();
      const topShown = rect.top >= 0;
      const bottomShown = rect.bottom <= window.innerHeight;
      this.toggle(topShown && bottomShown)
     
  }
  toggle(show:boolean){
    let metadata :AnimationMetadata[] = [];
    if(show === true && this.displayed === false){
      metadata = this.fadeIn();
    }
    else if(show === false && this.displayed === true){
     // metadata = this.fadeOut()
    }
    const factory = this.builder.build(metadata);
    const player = factory.create(this.el.nativeElement);
    player.play();
  }
}
