import { useState, React, useCallback } from "react";
import AsyncSelect from 'react-select/async'

import { debounce } from "lodash"

function BookSearch({ selectedValue, setSelectedValue, loadingBooks, setLoadingBooks, modalType }) {

  const [inputValue, setValue] = useState('');

  // handle input change event
  const handleInputChange = value => {
    setValue(value);
  };

  // handle selection
  const handleChange = value => {
    // setSelectedValue(value.key.replace('/works/',''));
    setSelectedValue(value);
  }

  // fetching options from books API to display on user search
  // utilizes debounce to minimize the number of fetchs regardless of user input characters
  const loadOptions = useCallback(
    debounce((inputValue, callback) => {
      setLoadingBooks(true)
      fetch(`https://openlibrary.org/search.json?q=${inputValue}&limit=50`)
        .then(res => res.json())
        .then(data => {
          callback(data.docs)
          setLoadingBooks(false)
        })
    }, 500),
    []
  );

  // styling the options that appear on user input into search bar
  function formatOptionLabel(option) {
    let pagesPublished = []
    if (option.number_of_pages_median) { pagesPublished.push(`${option.number_of_pages_median} pages`) }
    return (
      <div className="row">

        <div className="book-search-cover">
          {option.cover_i ?
            <div style={{ backgroundImage: `url("https://covers.openlibrary.org/b/id/${option.cover_i}-S.jpg")` }}></div> :
            <div style={{ backgroundColor: "grey" }}></div>
          }
        </div>

        <div className="col-5">
          <div><span className="fw-bold fs-3 text-capitalize">{option.title}&nbsp;</span> <span className="opacity-50">({option.first_publish_year})</span></div>

          <div className="opacity-75 text-capitalize">{option.author_name ? option.author_name[0] : option.author_name}</div>
        </div>
        <div className="col-6 d-flex flex-column text-end justify-content-center text-lowercase">
          <div className="opacity-50 text-truncate" title={option.subject?.slice(0, 4).join(" / ")}>{option.subject?.slice(0, 4).join(" / ")}</div>
          <div className="opacity-50">{pagesPublished.join(' | ')}</div>
        </div>
      </div>
    )
  }

  // styling of what is in the search box on user select
  const determineLabel = (option, context) => {
    if (context.context === 'menu') { return formatOptionLabel(option) }
    else { return (`${option.title} by ${option.author_name}`); }
  }

  // preventing error when user presses enter before option can be selected
  function handleEnterPress(e) {
    if (e.keyCode === 13) {
      e.preventDefault()
      e.stopPropagation()
    }
  }

  return (
    <div>
      <AsyncSelect
        className="form-control form-control-solid p-1 border-0"
        classNamePrefix="book-search"
        value={selectedValue || ""}
        getOptionLabel={option => option.title}
        getOptionValue={option => option}
        formatOptionLabel={determineLabel}
        loadOptions={loadOptions}
        hideSelectedOptions={false}
        onInputChange={handleInputChange}
        onChange={handleChange}
        onFocus={() => setSelectedValue("")}
        isLoading={loadingBooks}
        onKeyDown={(e) => handleEnterPress(e)}
        // menuIsOpen={true}
        // onMenuOpen={() => {debugger}}
        isMulti={modalType === "new-collection-entry-modal" ? true : false}
      />
      {/* allows to visualize selected value on user click, to be deleted once functionality is finsihed */}
      {/* <pre>Selected Value: {JSON.stringify(selectedValue || {}, null, 2)}</pre> */}
    </div>
  )
}

export default BookSearch;

