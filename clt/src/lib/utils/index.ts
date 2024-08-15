/**
 * Partitions an array into two arrays, one that contains elements that meet the predicate, and the other
 * that doesn't
 * @param array 
 * @param predicate 
 * @returns A tuple array containing the arrays that meet the condition and ones that don't.
 */
export function partition<T>(array: T[], predicate: (item: T) => boolean): [T[], T[]] {
    return array.reduce<[T[], T[]]>(
        ([pass, fail], item) => {
            return predicate(item)
                ? [[...pass, item], fail]
                : [pass, [...fail, item]];
        },
        [[], []]
    );
}