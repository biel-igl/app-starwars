import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import ApiProvider from '../context/ApiProvider'
import testData from '../../cypress/mocks/testData';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

describe('Testes de renderização em App', () => {

  beforeEach(async () => {
    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(testData),
      })
    );
  });

  afterEach(() => {
    global.fetch.mockRestore()
  });
  it('Testa se todos os inputs estão sendo renderizados na tela', async () => {
    render(
      <ApiProvider>
        <App/>
      </ApiProvider>
    )

    const filterName = await screen.findByTestId('name-filter');
    const filterColumn = await screen.findByTestId('column-filter');
    const filterComparison = await screen.findByTestId('comparison-filter');
    const filterValue = await screen.findByTestId('value-filter');
    const filterButton = await screen.findByTestId('button-filter');
    const filterButtonClear = await screen.findByTestId('button-remove-filters');
    const sortColumn = await screen.findByTestId('column-sort');
    const sortASC = await screen.findByTestId('column-sort-input-asc');
    const sortDESC = await screen.findByTestId('column-sort-input-desc');
    const sortButton = await screen.findByTestId('column-sort-button');
    const all = [filterName, filterColumn, filterComparison,filterValue,filterButton,filterButtonClear,sortColumn,sortASC,sortDESC,sortButton]
    all.map((cada)=> expect(cada).toBeInTheDocument())
  });
  it('Testa se a tabela tem 10 colunas', async () => {
    render(
      < ApiProvider>
        <App/>
      </ApiProvider>
    )
    const tableColumn = await screen.findAllByRole('columnheader');
    expect(tableColumn).toHaveLength(13);
    const list = await screen.findAllByTestId('planet-name');
    expect(list).toHaveLength(10)
  });
})

describe('Testa filtros', () => {
  
  beforeEach(async () => {
    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(testData),
      })
    );
  });

  afterEach(() => {
    global.fetch.mockRestore()
  })

  it('Testa se filtro de nome funciona', async () => {
  render(
    < ApiProvider>
      <App/>
    </ApiProvider>
  )
  const filterName = await screen.findByTestId('name-filter');
  userEvent.type(filterName,'ta');
  const list = await screen.findAllByTestId('planet-name');
  expect(list).toHaveLength(1);
 })
 it('Testa se filtro de comparação funciona', async () => {
  render(
    < ApiProvider>
      <App/>
    </ApiProvider>
  )
  const filterColumn = await screen.findByTestId('column-filter');
  expect(filterColumn).toHaveValue('population');
  const filterComparison = await screen.findByTestId('comparison-filter');
  expect(filterComparison).toHaveValue('maior que');
  const filterValue = await screen.findByTestId('value-filter');
  expect(filterValue).toHaveValue(0);
  const filterButton = await screen.findByTestId('button-filter');
  act(async()=>{
    userEvent.click(filterButton);
    const list = await screen.findAllByTestId('planet-name');
    expect(list).toHaveLength(8);
  })
 })
})