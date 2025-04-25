import { GET_COMMITTEE_QUERY } from "./graphqlQueries";

export async function fetchData(entityId, isPerformanceBased) {
    const response = await fetch(process.env.REACT_APP_BACKEND_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `${GET_COMMITTEE_QUERY}`,
        variables: { 
          id: entityId,
          is_performance_base: isPerformanceBased,
        },
      }),
    });
  
    const result = await response.json();
  
    if (result.errors) {
      throw new Error(result.errors[0].message || 'GraphQL error');
    }
  
    return result.data.committee;
}

  