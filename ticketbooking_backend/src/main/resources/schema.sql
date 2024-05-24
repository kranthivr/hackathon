CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    UNIQUE(username)
);

CREATE TABLE movies (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description text,
    img_data text
);

CREATE TABLE tickets (
    id bigint AUTO_INCREMENT primary key,
    seat_name VARCHAR(4),
    movie_id bigint not null,
    show_at timestamp not null,
    is_booked boolean default false,
    booked_at timestamp,
    user_id bigint,
    foreign key (movie_id) references movies(id),
    foreign key (user_id) references users(id)
)