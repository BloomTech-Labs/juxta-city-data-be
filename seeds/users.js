
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username:'lowman', email:'lowman21@gmail.com', password:'password123', first_name:'Lester', last_name: 'Kester', dob:'2001-02-02', address:'876 w 16th St', city:'New York', state:'New York', zip: 92312},
        {username:'steezywatercooler', email:'JakeSnake@gmail.com', password:'foolme1ce', first_name:'Jake', last_name: 'Baker', dob:'1974-11-01', address:'1123 N Curly court', city:'Portland', state:'Oregon', zip: 45612},
        {username:'biscuits', email:'TimmyH@gmail.com', password:'ch33s3p0tat03s', first_name:'Tim', last_name: 'Heidecker', dob:'1982-2-09', address:'615 W Ward Rd', city:'Seattle', state:'Washington', zip: 68762},
        {username:'jorts64', email:'Jorty21@gmail.com', password:'watercolors67#', first_name:'Jon', last_name: 'Stamos', dob:'1998-11-18', address:'1123 NE Bluebery Ln', city:'Flint', state:'Michigan', zip: 87642},
        {username:'stickerLover!', email:'StickerClicker@gmail.com', password:'passme3', first_name:'Stacy', last_name: 'Stodem', dob:'1994-2-17', address:'4138 S Cheese St', city:'Boulder', state:'Colorado', zip: 74085},
      ]);
    });
};
