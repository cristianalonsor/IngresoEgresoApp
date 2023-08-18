import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http'
import { StoreModule } from '@ngrx/store';
import { NgChartsModule } from 'ng2-charts';

//Firebase
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';

//componentes
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { appReducer } from './app.reducer';
import { provideStoreDevtools, StoreDevtoolsModule } from '@ngrx/store-devtools';

//Modulos
import { AuthModule } from './auth/auth.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
    StoreModule.forRoot( appReducer ),
    StoreDevtoolsModule,
    AuthModule, 
  ],
  providers: [
    {provide: FIREBASE_OPTIONS,
    useValue: environment.firebase},
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !environment.production,
    }),
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
