import React, { Component, PropTypes } from 'react';
import PagerLink from '../PagerLink';

class Pager extends Component {
  handlePagerLinkClick = (direction) => {
    this.props.onPagerClick(direction);
  }

  render() {
    const { meta } = this.props;

    return (
      <nav className="pager">
        <div className="btn-group" style={{ display: 'flex', marginBottom: '.5rem' }}>
          <PagerLink
            direction="prev"
            disabled={!meta.prevPage}
            onPagerLinkClick={this.handlePagerLinkClick}
          />
          <PagerLink
            direction="next"
            disabled={!meta.nextPage}
            onPagerLinkClick={this.handlePagerLinkClick}
          />
        </div>
        <div className={`small text-muted text-xs-right ${!meta.totalPages && 'invisible'}`}>
          Page {meta.currentPage} of {meta.totalPages}
        </div>
      </nav>
    );
  }
}

Pager.propTypes = {
  meta: PropTypes.object.isRequired,
  onPagerClick: PropTypes.func.isRequired,
};

export default Pager;
