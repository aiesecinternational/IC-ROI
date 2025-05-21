export const GET_COMMITTEE_QUERY = `
  query GetCommittee($id: Int!, $is_performance_base: Boolean!) {
    committee(id: $id, is_performance_base: $is_performance_base) {
      id
      name
      delegate_fee
      flight_fee
      iGV_Fee
      oGV_Fee
      iGTe_Fee
      iGTa_Fee
      oGTa_Fee
      oGTe_Fee
      iGV_Exchange
      oGV_Exchange
      iGTa_Exchange
      oGTa_Exchange
      iGTe_Exchange
      oGTe_Exchange
    }
  }
`;