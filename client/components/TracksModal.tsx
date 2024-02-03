
export default function TracksModal({ tracks, onClose }) {
    return (
      <div className="modal-backdrop" onClick={onClose}>
        <div className="modal-content" onClick={e => e.stopPropagation()}>
          <h2>Tracks</h2>
          <ul>
            {tracks.map(track => (
              <li key={track.id}>{track.title}</li>
            ))}
          </ul>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    );
  }
  