export default function Results({ userName, element, artwork }) {
    return (
      <div>
        <p>
          <strong>{userName}</strong>, your element is: {element}
        </p>
  
        {artwork ? (
          <div className="artwork">
            <h2>{artwork.title}</h2>
            <img src={artwork.primaryImage} alt={artwork.title} />
            <p>{artwork.artistDisplayName}</p>
            <p>{artwork.objectDate}</p>
          </div>
        ) : (
          <p>No artwork found.</p>
        )}
      </div>
    );
  }
  