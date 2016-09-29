## Getting started

Install dependencies

```
bundle install
```

Create database

```
bundle exec rake db:create db:migrate
```

Optional: create `.env` file in project root based on `.env.example`

Boot it up
(client starts on port 3000 by default and expects API on port 3001)

```
rails server -p 3001
```

Optional: If you want to process background jobs, start redis and sidekiq in
separate terminal windows

```
redis-server
```

```
bundle exec sidekiq
```

## Testing

Run all tests

```
bundle exec rspec spec
```

Watch test files for changes

```
bundle exec guard
```

## API versions

V0 is the API consumed internally by the Ekto client

V1 is the public API
