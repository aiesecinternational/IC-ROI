export const GET_COMMITTEE_QUERY = `
  query GetCommittee($id: Int!) {
    committee(id: $id) {
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
    }
  }
`;