import React from 'react';

const styles = {
  pageContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100%'
  }
};

export default function NoAccess(props) {
  return (
    <div style={styles.pageContent}>
      <div className="row">
        <div className="col text-center mb-5">
          <h3>
            You dont have access on this page!
          </h3>
          <p className="text-muted">
            <a href="#">Return Home</a>
          </p>
        </div>
      </div>
    </div>
  );
}
