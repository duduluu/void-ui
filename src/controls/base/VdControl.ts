import {
  Component,
  Emit,
  Inject,
  Model,
  Prop,
  Provide,
  Vue,
  Watch,
} from 'vue-property-decorator';
import {
  ControlGenre,
  ControlTone,
  ControlSkin,
  ControlSize,
  ControlShape,
} from 'typings';

@Component
export class VdHub extends Vue {
  genre: ControlGenre = 'lite';
}

@Component
export class VdControl extends Vue {
  // single instance for state management
  private static readonly hub = new VdHub();
  get $void(): VdHub {
    return VdControl.hub;
  }

  get componentName(): string | undefined {
    return this.$options.name;
  }

  // !!!Important!!!
  @Prop() disabled: boolean;
}

@Component
export class VdStylableControl extends VdControl {
  @Prop() genre: ControlGenre;

  @Prop({ default: 'primary' })
  tone: ControlTone;

  @Prop({ default: 'fill' })
  skin: ControlSkin;

  @Prop({ default: 'medium' })
  size: ControlSize;

  @Prop({ default: 'rect' })
  shape: ControlShape;

  get stylableClasses(): ClassNames {
    return [
      {
        disabled: this.disabled,
      },
      `genre-${this.genre || this.$void.genre}`,
      `tone-${this.tone}`,
      `skin-${this.skin}`,
      `size-${this.size}`,
      `shape-${this.shape}`,
    ];
  }

  private a = '1';
  private b = '2';
  private c = '3';

  // 123
  public get dddd(): string {
    return this.a + this.b + this.c;
  }
}

export interface VdLoadingControl {
  loading: boolean;
}
