import { Component, OnInit, ɵCodegenComponentFactoryResolver } from '@angular/core';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model: any = {};
  constructor(private authService: AuthService) { }

  ngOnInit() {
  }
login()
{
 this.authService.login(this.model).subscribe(next =>
  {
    console.log('Zalogowałeś sie pomyślnie');
  }, error => 
  {
    console.log('Wystąpił błąd');
  });
}

}
