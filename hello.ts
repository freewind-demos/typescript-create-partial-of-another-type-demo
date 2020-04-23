type BigType = {
  aaa: string,
  bbb?: number,
  ccc: boolean[],
  extra?: {
    [key in string]?: string
  },
  nested1: {
    nested2: {
      nested3: {
        [key in string]?: string
      }
    }
  }
}

type RecursivePartial<T> = {
  [P in keyof T]?:
  T[P] extends (infer U)[] ? RecursivePartial<U>[] :
    T[P] extends object ? RecursivePartial<T[P]> :
      T[P];
};

function partialOf<T>() {
  return <X extends RecursivePartial<T>>(x: X): X => {
    return x;
  }
}

const partialOfBigType = partialOf<BigType>();

const partial: {
  aaa: string;
  extra: { ddd: string };
  nested1: { nested2: {} }
} = partialOfBigType({
  aaa: 'aaa11',
  extra: {'ddd': '222'},
  nested1: {nested2: {}}
})

console.log(partial)
