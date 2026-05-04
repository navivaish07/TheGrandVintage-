# TODO: Fix Angular Compilation Errors

## Steps to Complete

- [x] Update ContactComponent (src/app/components/pages/contact/contact.component.ts):
  - Import FormsModule
  - Add title property
  - Add contact object with name, email, message
  - Add submitForm method

- [x] Update FooterComponent (src/app/components/shared/footer/footer.component.ts):
  - Add year property set to new Date().getFullYear()

- [x] Update AppComponent (src/app/app.component.ts):
  - Add links array for *ngFor
  - Import CommonModule for *ngFor
  - Remove unused imports: AuthModalComponent, HeaderComponent, FooterComponent

- [x] Test the fixes by running `ng serve --o` to ensure no compilation errors
