
import React from 'react';
import { act } from 'react-dom/test-utils';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import TodoList from './TodoList';
Enzyme.configure({ adapter: new Adapter() });


describe('Test Todo List Component Functionality', () => {
  let wrapper;

  beforeEach(() => {
  });

  afterEach(() => {
  })

  it('Mounts with two list items', () => {
    
    const todos = [{name: 'Read chapter'}, {name: 'Buy Shampoo'}]
    wrapper = mount(<TodoList
        todos={todos}
        onClickDeleteTodo={() => () => {}}
        onClickToggleCompleted={() => () => {}}
    />)
    expect(wrapper).not.toBeNull();
    expect(wrapper.find('.todo-item').length).toBe(2);
  });

  it('list size is reduced by one when item is deleted', () => {

  })

});
