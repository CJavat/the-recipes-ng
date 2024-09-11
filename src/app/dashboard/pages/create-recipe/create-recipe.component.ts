import { Component, computed, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { RecipeService } from '../../services/recipe.service';
import { ValidatorsService } from '../../../shared/services/validators.service';
import { DashboardService } from '../../services/dashboard.service';

import { environment } from '../../../../environments/environment';

import { CategoriesResponse } from '../../interfaces';

@Component({
  selector: 'app-create-recipe',
  templateUrl: './create-recipe.component.html',
})
export class CreateRecipeComponent implements OnInit {
  private router = inject(Router);
  private hostUrl = environment.backendUrl;

  public myForm: FormGroup;
  public categories: CategoriesResponse[] | null = [];

  public imageUrl?: string;
  public recipeId: string | undefined = undefined;
  public isEditing: boolean = false;

  public selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;

  public finishedLoading = computed<boolean>(() => {
    if (this.dashboardService.isLoading()) return true;
    return false;
  });

  constructor(
    private formBuilder: FormBuilder,
    private validatorsService: ValidatorsService,
    private recipeService: RecipeService,
    private dashboardService: DashboardService
  ) {
    this.myForm = this.formBuilder.group({
      title: [
        '',
        [
          Validators.required,
          Validators.pattern(this.validatorsService.titlePattern),
        ],
      ],
      description: [''],
      ingredients: this.formBuilder.array([
        this.formBuilder.control('', Validators.required),
      ]),
      steps: this.formBuilder.array([
        this.formBuilder.control('', Validators.required),
      ]),
      image: [null],
      category: [''],
    });
  }
  ngOnInit(): void {
    this.isEditing = false;
    this.dashboardService.getAllCategories().subscribe({
      next: (categories) => (this.categories = categories),
      error: (error) => {
        Swal.fire('Error', error[0], 'error');
        console.error(error);
      },
    });

    this.recipeId = this.router.url.split('/').at(-1) ?? '';
    if (this.recipeId !== 'new-recipe') {
      this.isEditing = true;
      this.recipeService.getRecipeById(this.recipeId).subscribe({
        next: (recipe) => {
          this.myForm.patchValue({
            title: recipe.title,
            description: recipe.description,
            ingredients: recipe.ingredients ?? [],
            steps: recipe.steps ?? [],
            file: null,
            category: recipe.Category?.id ?? '',
            image: recipe.image,
          });

          if (recipe.image.includes('http')) {
            this.imageUrl = `${recipe.image}`;
          } else {
            this.imageUrl = `${this.hostUrl}/${recipe.image}`;
          }
        },
        error: (error) => {
          Swal.fire('Error', error[0], 'error');
          console.error(error);
        },
      });
    }
  }

  get ingredients(): FormArray {
    return this.myForm.get('ingredients') as FormArray;
  }

  get steps(): FormArray {
    return this.myForm.get('steps') as FormArray;
  }

  addIngredient() {
    this.ingredients.push(this.formBuilder.control('', Validators.required));
  }

  addStep() {
    this.steps.push(this.formBuilder.control('', Validators.required));
  }

  isValidField(field: string) {
    return this.validatorsService.isValidField(this.myForm, field);
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.selectedFile = file;

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    this.myForm.markAllAsTouched();

    const ingredients = this.ingredients;
    const steps = this.steps;

    const formData = new FormData();
    formData.append('title', this.myForm.get('title')?.value);
    formData.append('description', this.myForm.get('description')?.value);
    formData.append('categoryId', this.myForm.get('category')?.value);
    ingredients.controls.forEach((control) => {
      formData.append('ingredients[]', control.value);
    });
    steps.controls.forEach((control) => {
      formData.append('steps[]', control.value);
    });

    if (this.selectedFile) {
      formData.append('file', this.selectedFile);
    }

    if (this.isEditing) {
      this.dashboardService.isLoading.set(true);
      this.recipeService.updateRecipe(this.recipeId!, formData).subscribe({
        next: (recipe) => {
          Swal.fire(
            'Receta Actualizada',
            'La receta ha sido acutalizada correctamente',
            'success'
          ).then(() => {
            this.router.navigate(['/dashboard/recipe', recipe.id]);
            this.dashboardService.isLoading.set(false);
          });
        },
        error: (error) => {
          Swal.fire('Error', error[0], 'error');
          console.error(error);
          this.dashboardService.isLoading.set(false);
        },
      });
    } else {
      this.dashboardService.isLoading.set(true);
      this.recipeService.createRecipe(formData).subscribe({
        next: (recipe) => {
          Swal.fire(
            'Receta Creada',
            'La receta ha sido creada correctamente',
            'success'
          ).then(() => {
            this.router.navigate(['/dashboard/recipe', recipe.id]);
            this.dashboardService.isLoading.set(false);
          });
        },
        error: (error) => {
          Swal.fire('Error', error[0], 'error');
          console.error(error);
          this.dashboardService.isLoading.set(false);
        },
      });
    }
  }
}
