import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import CakesTabs from '../../components/admin/Cakes/CakesTabs';
import { TODAY_SPECIAL, BEST_SELLING } from '../../constants/constants';

const AdminCakes = ({ loadCakes, cakes, history }) => {
  useEffect(() => {
    loadCakes();
  }, [loadCakes]);

  const addCake = () => history.push('/admin/cakes/add', { add: true });

  const updateCake = cakeId =>
    history.push(`/admin/cakes/update/${cakeId}`, {
      update: true,
      id: cakeId,
    });

  const keys = [
    { eventKey: 'all', title: 'All Cakes', targetTab: null },
    {
      eventKey: 'today_special',
      title: "Today's Special",
      targetTab: TODAY_SPECIAL,
    },
    {
      eventKey: 'best_selling',
      title: 'Best Selling',
      targetTab: BEST_SELLING,
    },
  ];

  return (
    <CakesTabs
      keys={keys}
      cakes={cakes}
      addCake={addCake}
      updateCake={updateCake}
    />
  );
};

const mapStateToProps = state => {
  const { cakes } = state.cake;

  return {
    cakes,
  };
};

export default connect(mapStateToProps)(withRouter(AdminCakes));
