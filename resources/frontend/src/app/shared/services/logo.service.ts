// src/app/icon.service.ts
import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogoService {
  private renderer: Renderer2;

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  setIcon(iconUrl: string): void {
    const link: HTMLLinkElement = this.renderer.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = iconUrl;

    const head = this.renderer.selectRootElement('head', true);
    const existingLink = this.renderer.selectRootElement('link[rel*="icon"]', true);

    if (existingLink) {
      this.renderer.removeChild(head, existingLink);
    }
    this.renderer.appendChild(head, link);
  }
}
