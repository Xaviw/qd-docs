# TypeScript 技巧

## 正确理解结构类型

TS 的类型系统称为结构类型，或者**鸭子类型**（如果一只动物走起来像鸭子，游泳像鸭子，叫得也像鸭子，那么它就是鸭子）

也就是说 TS 中如果 A 类型满足 B 类型的所有特征，那么 A 就可以代替 B 使用，或者说 A 是 B 的子类型

所以比原类型具有更多属性的类型为子类型，举个例子，下面三个都是 TS 中合法的类型：

- `object`：对应引用类型
- `{}`：空对象字面量对应的类型
- `Object`：`Object` 构造函数对应的类型

如果从 JS 的角度理解下面的类型运算可能很困难：

<IframeContainer src="https://www.typescriptlang.org/zh/play/?#code/C4TwDgpgBAglC8UD2AjAVhAxsKEAewEAdgCYDOUA3gL5QD8UwATgK7QBcUAZgIYA2ZCAG4AUCNCQoAIQRQA8uiw58hUhVQZs9Rqw7d+g0ePDQAwrIWblBYuSq0GzNlE68BwsROgARWQEZcGzV7bSc9N0MgA" />

这时候就需要结合上面提到的子类型概念，从 TS 的角度进行理解：

`{}` 代表一个没有任何成员的对象,那么任何有成员的对象都能在 `{}` 的基础上延伸出来，也就是 `{}` 的子类型

对于普通类型，都有对应的构造函数类型，例如 `number -> Number`，而构造函数也是一个对象，当然也能从 `{}` 的基础上进行延申，所以任何对象类型和有对应构造函数的类型都是 `{}` 的子类型

同样的 `Object` 表示构造函数，也是一种引用类型，自然是 `object` 的子类型

## 善用类型定义

TS 在实际开发中提供最大的好处莫过于类型提示，项目中的问题应该尽量尝试从类型中找答案

例如不知道函数如何使用时，可以鼠标 hover 函数名，查看对应的类型定义来理解函数的用法。如果类型定义较为复杂，可以通过 `ctrl + 点击函数名` 或光标定位函数名后按 `F12` 键跳转类型声明文件查看

不知道对象中包括哪些属性时，除了直接查看类型定义，还可以通过触发建议快捷键弹出类型定义中的定义的属性，快捷键默认为 `ctrl + space`

使用函数或类型时，为了得到更好的类型支持，还需要查看函数内的泛型定义，并正确传递泛型对应的类型。例如 Vue3 `defineComponent` 方法的类型定义为：

```ts
export declare function defineComponent<Props extends Record<string, any>, E extends EmitsOptions = {}, EE extends string = string, S extends SlotsType = {}>(setup: (props: Props, ctx: SetupContext<E, S>) => RenderFunction | Promise<RenderFunction>, options?: Pick<ComponentOptions, 'name' | 'inheritAttrs'> & {
  props?: (keyof Props)[]
  emits?: E | EE[]
  slots?: S
}): DefineSetupFnComponent<Props, E, S>
```

从类型定义可以看出 `emits` 因为有两种写法，所以定义了两个泛型进行约束，可以根据需要定义要使用的泛型，或者二者都定义

这种复杂的泛型，使用时可能会遇到传入类型后报错的情况，例如 `defineComponent` 直接用插槽对象类型定义 `SlotsType` 后就会报错。跳转到 `SlotsType` 查看后可以知道应该将具体的插槽类型作为 `SlotsType` 的泛型使用

```ts
import { type SlotsType, defineComponent } from 'vue'

// 报错
defineComponent<{}, {}, string, { default: { name: string } }>({})

defineComponent<{}, {}, string, SlotsType<{ default: { name: string } }>>({})
```

## 熟悉常用工具类型

开发中经常会有在已有类型基础上添加属性、减少属性等扩展需求，这时候应该考虑使用工具类型来简化扩展操作

熟悉内置工具类型也有利于阅读类型定义，查看[教程](https://wangdoc.com/typescript/utility)

## 扩展库类型

TODO
