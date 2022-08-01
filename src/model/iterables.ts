export function randomUInt(limit: number): number {
    return ~~(Math.random() * limit);
}

export function* range(length: number, from = 0): Iterable<number> {
    let i = from;
    while (i <= length) {
        yield i++;
    }
}

export function* product<T1, T2>(source1: Iterable<T1>, source2: Iterable<T2>): Iterable<[T1, T2]> {
    for (let item1 of source1) {
        for (let item2 of source2) {
            yield [item1, item2];
        }
    }
}

export function* uniqueRandomUint(limit: number): Iterable<number> {
    const allNumbers = [...range(limit - 1)];
    for (let i = 0; i < limit; i++) {
        const restRandomInd = randomUInt(limit - i);
        yield allNumbers[restRandomInd];
        allNumbers[restRandomInd] = allNumbers[limit - i - 1];
    }
}
