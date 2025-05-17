import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LanguageService } from 'src/app/shared/services/app/language.service';
import { RegisterService } from 'src/app/shared/services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  state = {
    files: [] as any,
  };
  uiState = {
    imgSrc: `../../../../assets/images/register.svg`,
    isLoading: false,
  };

  registerForm!: FormGroup<any>;

  constructor(
    private registerService: RegisterService,
    public languageService: LanguageService
  ) {}
  ngOnInit() {
    this.getAllBranches();
    this.initForm();
  }
  initForm() {
    this.registerForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      phoneNumber: new FormControl('', Validators.required),
      preferredBranch: new FormControl('', Validators.required),
    });
  }

  getAllBranches() {
    this.registerService.getAllBranches().subscribe((res) => {
      console.log(res);
    });
  }

  onFileDropped(event: any) {
    const droppedFiles = event.dataTransfer
      ? event.dataTransfer.files
      : event.target.files;
    for (let i = 0; i < droppedFiles.length; i++) {
      this.state.files.push(droppedFiles[i]);
      if (droppedFiles[i].type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          droppedFiles[i].preview = e.target.result;
        };
        reader.readAsDataURL(droppedFiles[i]);
      }
    }
  }

  onSubmit() {
    if (this.registerForm.valid) {
      console.log('Form submitted', this.registerForm.value);
      alert('Form submitted successfully!');
      // handle submission
    }
  }
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }
}
