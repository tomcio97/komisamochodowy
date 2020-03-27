import { CanDeactivate } from '@angular/router';
import { ValueEditComponent } from '../value/value-edit/value-edit.component';

export class PreventUnsavedChanges implements CanDeactivate<ValueEditComponent> {
    canDeactivate(component: ValueEditComponent) {
        if(component.editForm.dirty)
        {
            return confirm('Czy napewno chcesz kontynuować? Wszelkie niezapisane zmiany zostaną utracone');
        }
        return true;
    }

}