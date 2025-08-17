import {
  Component, Input, Output, EventEmitter, ViewChild,
  ElementRef, ComponentFactoryResolver, ViewContainerRef,
  ComponentRef, OnDestroy, Type, Renderer2, HostListener
} from '@angular/core';

interface ModalConfig<T = any> {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
  inputs?: Partial<T>;
  data?: any;
  closeOnEscape?: boolean;
}

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnDestroy {
  @Input() title: string = '';
  @Input() show: boolean = false;
  @Input() size: 'sm' | 'md' | 'lg' | 'xl' | 'xxl' = 'md';
  @Input() closeOnEscape: boolean = true;
  @Output() close = new EventEmitter<void>();

  @ViewChild('modalBackdrop') modalBackdrop!: ElementRef;
  @ViewChild('modalDialog') modalDialog!: ElementRef;
  @ViewChild('contentContainer', { read: ViewContainerRef }) contentContainer!: ViewContainerRef;

  public sizeClasses = {
    sm: 'modal-sm',
    md: '',
    lg: 'modal-lg',
    xl: 'modal-xl',
    xxl: 'modal-xxl'
  };

  private componentRef: ComponentRef<any> | null = null;
  private removeKeydownListener: () => void;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private renderer: Renderer2
  ) {
    // SOLUCIÓN DEFINITIVA - Versión segura con type assertion
    this.removeKeydownListener = this.renderer.listen(
      'document',
      'keydown',
      (event: Event) => {
        const keyboardEvent = event as KeyboardEvent;
        this.handleKeydown(keyboardEvent);
      }
    );
  }

  private handleKeydown(event: KeyboardEvent): void {
    if (this.show && this.closeOnEscape && (event.key === 'Escape' || event.keyCode === 27)) {
      event.preventDefault();
      event.stopPropagation();
      this.onClose();
    }
  }

  open<T>(component: Type<T>, config: ModalConfig<T> = {}): void {
    try {
      this.destroyContent();
      this.show = true;
      this.closeOnEscape = config.closeOnEscape ?? true;

      if (config.size) {
        this.size = config.size;
      }

      setTimeout(() => {
        const factory = this.componentFactoryResolver.resolveComponentFactory(component);
        this.componentRef = this.contentContainer.createComponent(factory);

        const allInputs = {
          ...(config.inputs || {}),
          ...(config.data ? { data: config.data } : {})
        };

        this.assignInputsSafely(this.componentRef.instance, allInputs);
        this.showModalElements();
        this.modalBackdrop.nativeElement.focus();
      }, 0);
    } catch (error) {
      console.error('Error opening modal:', error);
      this.show = false;
    }
  }

  private assignInputsSafely<T>(instance: T, inputs: Record<string, any>): void {
    Object.keys(inputs).forEach((key: string) => {
      if (instance && Object.prototype.hasOwnProperty.call(instance, key)) {
        (instance as any)[key] = inputs[key];
      } else {
        console.warn(`Property '${key}' not found in component or not accessible`);
      }
    });
  }

  private showModalElements(): void {
    if (this.modalBackdrop?.nativeElement) {
      this.modalBackdrop.nativeElement.classList.add('show', 'd-block');
    }
    if (this.modalDialog?.nativeElement) {
      this.modalDialog.nativeElement.classList.add('show');
    }
  }

  onClose(): void {
    this.show = false;
    this.close.emit();
    this.destroyContent();
    this.hideModalElements();
  }

  private hideModalElements(): void {
    if (this.modalBackdrop?.nativeElement) {
      this.modalBackdrop.nativeElement.classList.remove('show', 'd-block');
    }
    if (this.modalDialog?.nativeElement) {
      this.modalDialog.nativeElement.classList.remove('show');
    }
  }

  ngOnDestroy(): void {
    this.removeKeydownListener();
    this.destroyContent();
  }

  private destroyContent(): void {
    if (this.componentRef) {
      this.componentRef.destroy();
      this.componentRef = null;
    }
    if (this.contentContainer) {
      this.contentContainer.clear();
    }
  }
}