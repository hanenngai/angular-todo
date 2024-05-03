import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ItemComponent } from './item/item.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'My To Do List' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.componentTitle).toEqual('My To Do List');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('My To Do List');
  });

  // integration tests

  it('should add new todo after todo creation', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.addItem('newTodo');
    expect(app.items.length).toEqual(5); //Expect there to be 4 + 1 items

    fixture.detectChanges();
    const itemComponents = fixture.nativeElement.querySelectorAll('app-item');
    const newItemCompenent = itemComponents[0];

    const newTodo = {description: 'newTodo', done: false}; 
    expect(newItemCompenent.innerText.slice(0, newItemCompenent.innerText.indexOf("\n"))).toEqual(newTodo.description); // Expect that the description of first todo item is the same as the added todo description
  });

  it('should not add new todo without description', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.addItem('');
    expect(app.items.length).toEqual(4);
  });

  it('should remove todo item', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    const currentLength = app.items.length;

    const itemToRemove = app.allItems[0];
    app.remove(itemToRemove);
    fixture.detectChanges();

    expect(app.items.length).toEqual(currentLength - 1);
  });
});
