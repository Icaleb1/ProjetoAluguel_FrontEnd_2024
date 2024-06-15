import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ProjetoAluguel_FrontEnd_2024';
 
  sidebarWidth: number = 250;

  toggleSidebar() {
    this.sidebarWidth = this.sidebarWidth === 150 ? 0 : 2500; // Alternar entre 0 (retrair) e 250 (expandir)
  }
}
