
import React from 'react';
import { act } from 'react-dom/test-utils';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import App from './App';
Enzyme.configure({ adapter: new Adapter() });

const mountAppComponent = () => (
  // Element is added above and attatched to fix Jest v25 bug testing focus
  // https://meganesulli.com/blog/managing-focus-with-react-and-jest
  mount(<App />,
    { attachTo: document.querySelector('#container') }
  )
)

describe('Test Todo List Functionality', () => {
  let wrapper;
  const container = document.createElement('div');
  container.id = 'container';
  document.body.appendChild(container);
  console.log('window', window.localStorage.getItem('todos'))

  beforeEach(() => {
    wrapper = mountAppComponent()
  });

  afterEach(() => {
    wrapper.unmount()
    localStorage.removeItem('todos')
  })

  it('renders', () => {
    expect(wrapper).not.toBeNull();
  });

  it('Mounts with zero list items', () => {
    expect(wrapper.find('.todo-item').length).toBe(0);
  });

  it('User adds todo, input is cleared and focused', () => {
    const todoInput = wrapper.find('#todo-input')
    const todoForm = wrapper.find('#todo-form')
    todoInput.simulate('change', { target: { value: 'Go for run' } });
    todoForm.simulate('submit')
    const todoItems = wrapper.find('.todo-item')
    expect(todoItems.length).toBe(1);
    expect(todoItems.at(0).text()).toBe('Go for run');
    expect(todoInput.getDOMNode().value).toBe('')
    expect(document.activeElement).toEqual(todoInput.getDOMNode())
  });

  it('Todo btn is disabled when input value.trim() is empty', () => {
    const todoInput = wrapper.find('#todo-input')
    let todoBtn = wrapper.find('#todo-btn-submit');
    todoInput.simulate('change', { target: { value: ' ' } });
    expect(todoBtn.getDOMNode().disabled).toBe(true)
  });

  it('Todo List loads with items saved in local storage', () => {
    wrapper.unmount()
    const todos = [{ name: 'Buy Milk' }, { name: 'Get Haircut' }, { name: 'Practice testing react app' }]
    localStorage.setItem('todos', JSON.stringify(todos.slice(0, 2)))
    wrapper = mountAppComponent()
    let todoItems = wrapper.find('.todo-item')
    expect(todoItems.length).toBe(2);
    const todoInput = wrapper.find('#todo-input')
    const todoForm = wrapper.find('#todo-form')
    todoInput.simulate('change', { target: { value: todos[2].name } });
    todoForm.simulate('submit')
    wrapper.unmount()
    wrapper = mountAppComponent()
    todoItems = wrapper.find('.todo-item')
    expect(todoItems.length).toBe(3);
    expect(todoItems.at(0).text()).toBe(todos[0].name);
    expect(todoItems.at(1).text()).toBe(todos[1].name);
    expect(todoItems.at(2).text()).toBe(todos[2].name);
  })

  it('Add todo and toggle strike through of text', () => {
    const todoInput = wrapper.find('#todo-input')
    const todoForm = wrapper.find('#todo-form')
    todoInput.simulate('change', { target: { value: 'Can toggle this' } });
    todoForm.simulate('submit')
    
    const getTodoItem = () => {
      return wrapper.find('.todo-item').at(0)
    }
    getTodoItem().simulate('click')
    expect(getTodoItem().getDOMNode().style.textDecoration).toBe('line-through')
    getTodoItem().simulate('click')
    expect(getTodoItem().getDOMNode().style.textDecoration).not.toBe('line-through')
  })

  it('list size is reduced by one when item is deleted', () => {

  })

});
