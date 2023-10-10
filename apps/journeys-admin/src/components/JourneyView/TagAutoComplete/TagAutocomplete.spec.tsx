import { fireEvent, render, within } from '@testing-library/react'

import { TagAutocomplete } from '.'

describe('TagAutocomplete', () => {
  it('should render label, placeholder and options', () => {
    const { getAllByRole, getByRole } = render(
      <TagAutocomplete
        parentId="Holidays"
        tags={[
          { value: 'tag1', label: 'Ramadan' },
          { value: 'tag2', label: 'Christmas' },
          { value: 'tag3', label: 'Easter' }
        ]}
        label="label"
        placeholder="placeholder"
        onChange={jest.fn()}
      />
    )

    fireEvent.click(getByRole('button', { name: 'Open' }))

    expect(getByRole('combobox', { name: 'label' })).toHaveAttribute(
      'placeholder',
      'placeholder'
    )
    expect(getAllByRole('option')).toHaveLength(3)
    expect(getByRole('option', { name: 'Ramadan' })).toHaveAttribute(
      'data-option-index',
      '0'
    )
    expect(getByRole('option', { name: 'Christmas' })).toHaveAttribute(
      'data-option-index',
      '1'
    )
    expect(getByRole('option', { name: 'Easter' })).toHaveAttribute(
      'data-option-index',
      '2'
    )
  })

  it('should set initial tags and hide by limit', () => {
    const { getAllByRole, getByRole } = render(
      <TagAutocomplete
        parentId="Holidays"
        tags={[
          { value: 'tag1', label: 'Ramadan' },
          { value: 'tag2', label: 'Christmas' },
          { value: 'tag3', label: 'Easter' }
        ]}
        selectedTagIds={['tag2', 'tag3']}
        limit={1}
        onChange={jest.fn()}
      />
    )

    // One of the buttons is the "open dropdown button"
    expect(getAllByRole('button')).toHaveLength(2)
    expect(getByRole('button', { name: 'Christmas' })).toHaveAttribute(
      'data-tag-index',
      '0'
    )
    fireEvent.click(getByRole('button', { name: 'Open' }))
    expect(getAllByRole('button')).toHaveLength(3)
    expect(getByRole('button', { name: 'Easter' })).toHaveAttribute(
      'data-tag-index',
      '1'
    )
  })

  it('should call onChange with selected tag values', () => {
    const onChange = jest.fn()
    const { getByRole } = render(
      <TagAutocomplete
        parentId="Holidays"
        tags={[
          { value: 'tag1', label: 'Ramadan' },
          { value: 'tag2', label: 'Christmas' },
          { value: 'tag3', label: 'Easter' }
        ]}
        selectedTagIds={['tag2', 'tag3']}
        onChange={onChange}
      />
    )
    fireEvent.click(getByRole('button', { name: 'Open' }))
    fireEvent.click(
      within(getByRole('button', { name: 'Easter' })).getByTestId('CancelIcon')
    )
    expect(onChange).toHaveBeenCalledWith('Holidays', [
      { label: 'Christmas', value: 'tag2' }
    ])
    fireEvent.click(
      within(getByRole('option', { name: 'Ramadan' })).getByRole('checkbox')
    )
    expect(onChange).toHaveBeenCalledWith('Holidays', [
      { label: 'Christmas', value: 'tag2' },
      { label: 'Easter', value: 'tag3' },
      { label: 'Ramadan', value: 'tag1' }
    ])
  })
})
