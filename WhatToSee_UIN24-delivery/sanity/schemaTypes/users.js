export const users = {
  title: 'Brukere',
  name: 'users',
  type: 'document',
  fields: [
    {
      title: 'Brukernavn',
      name: 'username',
      type: 'string',
    },
    {
      title: 'Favoritt filmer',
      name: 'favoredMovies',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'movies'}]}],
    },
    {
      title: 'Ønskeliste av filmer',
      name: 'wishlistedMovies',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'movies'}]}],
    },
    {
      title: 'Favoritt sjangere',
      name: 'favoredGenres',
      type: 'array',
      of: [{ type: 'string' }],
    },
  ],
}
