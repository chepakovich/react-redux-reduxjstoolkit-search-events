import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  storeSearchResults,
  selectSearchResults,
} from './searchSlice';
import styles from './Search.module.css';

export function Search() {
  const searchResults = useSelector(selectSearchResults);
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');

  const executeSearch = (query) => {
    setSearchQuery(query)
    const url = `https://mobile-staging.gametime.co/v1/search?q=${query}`;
    console.log("url:", url)
    fetch (url)
      .then(response => response.json())
      .then(json => {
        const events = json.events;
        const performers = json.performers;
        const venues = json.venues;
        const limit = 3;
        const combined = {
          events: [...events.slice(0, limit)],
          performers: [...performers.slice(0, limit)],
          venues: [...venues.slice(0, limit)]
        }
        dispatch(storeSearchResults(combined));
      })

  }

  const { events, performers, venues } = searchResults
  const showResults = events.length > 0 || performers.length > 0 || venues.length > 0
  const card = (index, imgSrc, imgAlt, title, subtitle) => (
    <div key={index} className={styles.card}>
      <img
        src={imgSrc}
        alt={imgAlt}
        width="40"
        height="40"
      />
      <div className={styles.info}>
        <h3>{title}</h3>
        <p>{subtitle}</p>
      </div>
    </div>
  )

  return (
    <div className={styles.main}>
      <div className={styles.textbox}>
        <div className={styles.icon}>&#128269;</div>
        <input
          aria-label="Enter search query"
          value={searchQuery}
          onChange={e => executeSearch(e.target.value)}
        />
      </div>
      {showResults ?
        <div className={styles.results}>
          {events.length > 0 ?
            events.map((item, index) => (
              card(
                index,
                item.performers[0].hero_image_url.replace('@4x', ''),
                item.performers[0].name,
                item.event.name,
                item.venue.name
              )
            ))
          : null}

          {performers.length > 0 ?
            performers.map((item, index) => (
              card(
                index,
                item.hero_image_url.replace('@4x', ''),
                item.name,
                item.name,
                item.category.toUpperCase()
              )
            ))
          : null}

          {venues.length > 0 ?
            venues.map((item, index) => (
              card(
                index,
                item.image_url,
                item.name,
                item.name,
                item.city
              )
            ))
          : null}
        </div>
      : searchQuery ?
          <p className={styles.center}>Nothing found</p>
        : null
      }
    </div>
  );
}
