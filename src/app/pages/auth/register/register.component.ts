import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LanguageService } from 'src/app/shared/services/app/language.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  state = {
    uploadedItems: [] as any,
    previewImages: [] as any,
  };
  uiState = {
    imgSrc: `../../../../assets/images/register.svg`,
    isLoading: false,
  };

  registerForm!: FormGroup<any>;

  constructor(public languageService: LanguageService) {}
  ngOnInit() {
    this.initForm();
  }
  initForm() {
    this.registerForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      phoneNumber: new FormControl('', Validators.required),
    });
  }

  onFileInputChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files) return;

    const files: FileList = input.files;
    const fileArray = Array.from(files);
    this.state.uploadedItems = [];
    this.state.previewImages = [];

    const root: any = {};

    fileArray.forEach((file) => {
      const relativePath = (file as any).webkitRelativePath || file.name;
      const pathParts = relativePath.split('/');
      this.buildHierarchy(pathParts, file, root);
    });

    this.state.uploadedItems = this.objectToArray(root);
  }

  buildHierarchy(pathParts: string[], file: File, current: any) {
    const [head, ...tail] = pathParts;

    if (!tail.length) {
      if (!current[head]) {
        current[head] = { name: head, file, children: [] };
      }

      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = () => {
          this.state.previewImages.push(reader.result as string);
        };
        reader.readAsDataURL(file);
      }

      return;
    }

    if (!current[head]) {
      current[head] = { name: head, children: {} };
    }

    this.buildHierarchy(tail, file, current[head].children);
  }

  objectToArray(obj: any): any[] {
    return Object.values(obj).map((item: any) => ({
      name: item.name,
      ...(item.file ? { file: item.file } : {}),
      children: item.children ? this.objectToArray(item.children) : [],
    }));
  }

  onSubmit() {
    if (this.registerForm.valid) {
      console.log('Form Submitted:', this.registerForm.value);
      console.log('Uploaded Files:', this.state.uploadedItems);
      alert('Form submitted successfully!');
      // handle submission
    }
  }
  ngOnDestroy(): void {
    this.registerForm.reset();
  }
}
