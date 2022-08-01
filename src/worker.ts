import {expose} from 'comlink';
import {TaskGeneratorCache} from './model/task-generator-cache';

expose(new TaskGeneratorCache(3));
