export function shortenDate(dateString){
  return new Date(dateString).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"}) 
}