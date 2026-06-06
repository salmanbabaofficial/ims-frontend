import { Component } from '@angular/core';
import { AddEditStudentComponent } from '../active-students/add-edit-student/add-edit-student.component';

@Component({
  selector: 'app-admission-form',
  imports: [AddEditStudentComponent],
  templateUrl: './admission-form.component.html',
  styleUrl: './admission-form.component.css',
})
export class AdmissionFormComponent {
  onSaved(): void {}
  onCancelled(): void {}
}
