create view
  public.game_details as
select
  g.id,
  g.created_at,
  g.season_id,
  case
    when g.team_red_score > g.team_blue_score then 'team_red'::text
    else 'team_blue'::text
  end as winner,
  (
    select
      array_agg(gp.player_id) as array_agg
    from
      game_players gp
    where
      gp.game_id = g.id
  ) as player_ids,
  json_build_object(
    'score',
    g.team_red_score,
    'players',
    (
      select
        json_agg(
          json_build_object(
            'id',
            p.id,
            'created_at',
            p.created_at,
            'name',
            p.name,
            'image_url',
            p.image_url
          )
        ) as json_agg
      from
        game_players gp
        join players p on gp.player_id = p.id
      where
        gp.game_id = g.id
        and gp.team = 'team_red'::team
    )
  ) as team_red,
  json_build_object(
    'score',
    g.team_blue_score,
    'players',
    (
      select
        json_agg(
          json_build_object(
            'id',
            p.id,
            'created_at',
            p.created_at,
            'name',
            p.name,
            'image_url',
            p.image_url
          )
        ) as json_agg
      from
        game_players gp
        join players p on gp.player_id = p.id
      where
        gp.game_id = g.id
        and gp.team = 'team_blue'::team
    )
  ) as team_blue
from
  games g;

  create table
  public.game_players (
    created_at timestamp with time zone not null default current_timestamp,
    game_id bigint not null,
    player_id bigint not null,
    team public.team not null,
    constraint game_players_pkey primary key (game_id, player_id),
    constraint game_players_game_id_fkey foreign key (game_id) references games (id),
    constraint game_players_player_id_fkey foreign key (player_id) references players (id)
  ) tablespace pg_default;

  create table
  public.games (
    id bigint generated always as identity,
    created_at timestamp with time zone not null default current_timestamp,
    season_id bigint not null,
    team_red_score integer not null,
    team_blue_score integer not null,
    constraint games_pkey primary key (id),
    constraint games_season_id_fkey foreign key (season_id) references seasons (id)
  ) tablespace pg_default;

  create table
  public.players (
    id bigint generated always as identity,
    created_at timestamp with time zone not null default current_timestamp,
    name extensions.citext not null,
    image_url text null,
    is_archived boolean not null default false,
    constraint players_pkey primary key (id)
  ) tablespace pg_default;

  create table
  public.seasons (
    id bigint generated always as identity,
    created_at timestamp with time zone not null default current_timestamp,
    start_date date not null,
    end_date date null,
    constraint seasons_pkey primary key (id)
  ) tablespace pg_default;

  create
or replace function public.create_game (
  season_id integer,
  team_red_score integer,
  team_blue_score integer,
  team_red_players integer[],
  team_blue_players integer[]
) returns table (game_id integer) as $$
DECLARE
    new_game_id INTEGER;
BEGIN
    -- Insert into games table
    INSERT INTO games (season_id, team_red_score, team_blue_score)
    VALUES (season_id, team_red_score, team_blue_score)
    RETURNING id INTO new_game_id;
    -- Insert into game_players for team red
    INSERT INTO game_players (game_id, player_id, team)
    SELECT new_game_id, unnest(team_red_players), 'team_red';
    -- Insert into game_players for team blue
    INSERT INTO game_players (game_id, player_id, team)
    SELECT new_game_id, unnest(team_blue_players), 'team_blue';
    -- Return the new game ID
    RETURN QUERY SELECT new_game_id;
    EXCEPTION WHEN OTHERS THEN
        RAISE;
END;
$$ language plpgsql;


CREATE TYPE team AS ENUM ('team_red', 'team_blue');
