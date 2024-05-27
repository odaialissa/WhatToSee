export const movies = {
   title: 'Filmer',
   name: 'movies',
   type: 'document',
   fields: [
      {
         title: 'Filmtittel',
         name: 'movietitle',
         type: 'string',
      },
      {
         title: 'Filmposter',
         name: 'poster',
         type: 'url'
      },
      {
         title: 'imdbid',
         name: 'IMDBid',
         type: 'string'
      },
      {
         title: 'Sjangere',
         name: 'genres',
         type: 'array',
         of: [{ type: 'reference', to: { type: 'genre' } }],
      }
   ]
}