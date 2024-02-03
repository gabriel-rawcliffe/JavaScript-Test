import request from 'superagent'

export async function getCdData() {
  try {
    const response = await fetch('/api/music/cds?projection=cdDetails')
    ;
    const data = await response.json();
    return data._embedded.cds;
  } catch (err) {
    console.error('Error fetching CD data:', err);
    throw err; 
  }
}



