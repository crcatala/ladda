# Polling
Caching and polling are not natural friends. We still didn't find a very nice way to make it work, but we did find a way to make it work.

```
getAll.operation = 'READ';
export function getAll(query) {
    return get('/downloads', query);
}

poll.invalidates = ['getAll'];
export function poll(query) {
    return get('/downloads', query);
}
```

Everytime you call poll, it will get the latest data. It won't cache it. But it will invalidate getAll, ensuring that a subsequent call to getAll won't show older data than you just retrieved by calling poll. When you are not polling, getAll will be cached as specified in your entity configuration.