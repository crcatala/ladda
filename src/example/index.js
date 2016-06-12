import { compose } from './fp';
import {
    createDatastore,
    registerApi,
    registerMiddleware,
    build } from 'datastore';
import caching from 'caching';
import * as JsonPlaceholder from './api/jsonplaceholder';
import * as Github from './api/github';
import cacheConfig from './cache-config';

function run() {
    const datastore = buildDatastore();

    Promise.resolve()
           .then(getAllPosts(datastore))
           .then(savePosts(datastore))
           .then(getSomePosts(datastore))
           .then(getSomePosts(datastore))
           .then(printAllPosts)
           .then(getAllPosts(datastore))
           .then(printAllPosts);

    /*
       Two times we fetch data. Once for the some posts and once
       for all posts.
     */
}

function buildDatastore() {
    const datastore = createDatastore();
    const configure = compose(
        registerMiddleware(caching(cacheConfig)),
        registerApi('Github', Github),
        registerApi('JsonPlaceholder', JsonPlaceholder)
    );

    return build(configure(datastore));
}

function getSomePosts(datastore) {
    return () => datastore.JsonPlaceholder.getAllPostsWithIdHigerThan(80);
}

function getAllPosts(datastore) {
    return () => datastore.JsonPlaceholder.getAllPosts();
}

function savePosts(datastore) {
    return () => datastore.JsonPlaceholder.savePosts(
        [
            {id: 31, body: 'hej'},
            {id: 1, body: 'Fisk'}
        ]
    );
}

function printAllPosts(posts) {
    console.log(posts);
}

run();