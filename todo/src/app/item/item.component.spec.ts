import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Item } from '../item';
import { ItemComponent } from './item.component';

describe('ItemComponent', () => {
  let component: ItemComponent;
  let fixture: ComponentFixture<ItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ItemComponent);
    component = fixture.componentInstance;
    component.item = {description: 'Test', done: false};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize correctly', () => {
    expect(component.editable).toBeFalse(); // Expect editable to be false initially
    expect(component.item).toEqual({ description: 'Test', done: false }); // Expect item to be initialized correctly
  });

  it('should save item correctly', () => {
    const newDescription = 'Updated description';
    component.saveItem(newDescription);
    expect(component.editable).toBeFalse(); // Expect editable to be false after saving
    expect(component.item.description).toEqual(newDescription); // Expect description to be updated
  });

  it('should enter edit mode', () => {
    expect(component.editable).toBeFalse();
    // Simulate a click on the "Edit" button
    const editButton = fixture.nativeElement.querySelector('.btn');
    editButton.click();
    expect(component.editable).toBeTrue(); // Expect editable to be true after calling editItem
  });

  it('should toggle item done state when checkbox is clicked', () => {
    // Initially, item.done should be false
    expect(component.item.done).toBeFalse();

    // Simulate a click on the checkbox
    const checkbox = fixture.nativeElement.querySelector('input[type="checkbox"]');
    checkbox.click();

    // After clicking, item.done should be true
    expect(component.item.done).toBeTrue();

    // Click again to toggle
    checkbox.click();

    // After clicking again, item.done should be false
    expect(component.item.done).toBeFalse();
  });

  it('should save edited item description', () => {
    // Initially, editable should be false
    expect(component.editable).toBeFalse();
  
    // Simulate a click on the "Edit" button
    const editButton = fixture.nativeElement.querySelector('.btn');
    editButton.click();
  
    // After clicking edit, editable should be true
    expect(component.editable).toBeTrue();
    fixture.detectChanges();
    // Simulate entering a new description in the input field
    const editedItemInput = fixture.nativeElement.querySelector('.sm-text-input');
    editedItemInput.value = 'New item description';
    editedItemInput.dispatchEvent(new Event('input'));
  
    // Simulate pressing the "Save" button
    const saveButton = fixture.nativeElement.querySelector('.btn-save');
    saveButton.click();
  
    // After saving, editable should be false
    expect(component.editable).toBeFalse();
  
    // The item's description should be updated to the new description
    expect(component.item.description).toEqual('New item description');
  });
  
  it('should not save edited item description on cancel', () => {
    // Initially, editable should be false
    expect(component.editable).toBeFalse();
  
    // Simulate a click on the "Edit" button
    const editButton = fixture.nativeElement.querySelector('.btn');
    editButton.click();
  
    // After clicking edit, editable should be true
    expect(component.editable).toBeTrue();
    fixture.detectChanges();
  
    // Simulate entering a new description in the input field
    const editedItemInput = fixture.nativeElement.querySelector('.sm-text-input');
    editedItemInput.value = 'New item description';
    editedItemInput.dispatchEvent(new Event('input'));
  
    // Simulate pressing the "Cancel" button
    const cancelButton = fixture.nativeElement.querySelector('.btn');
    cancelButton.click();
  
    // After canceling, editable should be false
    expect(component.editable).toBeFalse();
  
    // The item's description should remain unchanged
    expect(component.item.description).toEqual('Test');
});

  it('should delete item', () => {
  // Define a spy on the remove EventEmitter
  const removeSpy = spyOn(component.remove, 'emit').and.callThrough();

  // Simulate a click on the "Delete" button

  const deleteButton = fixture.nativeElement.querySelector('.btn-warn');
  deleteButton.click();

  // Expect the remove event to be emitted
  expect(removeSpy).toHaveBeenCalled();
});
});
