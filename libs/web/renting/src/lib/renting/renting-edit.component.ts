import { Component } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'res-renting-edit',
  standalone: true,
  template: `
    <div class="w-full h-full px-20 py-12 flex justify-center">
      <form [formGroup]="form" (submit)="submit()" class="w-1/2">
        <div>
          <div class="text-lg font-medium">租屋資訊</div>
          <div class="flex flex-col">
            <div class="flex gap-4">
              <label class="form-control w-full max-w-xs">
                <div class="label">
                  <span class="label-text">標題</span>
                </div>
                <input
                  type="text"
                  placeholder="請輸入標題"
                  formControlName="title"
                  class="input input-bordered input-primary w-full max-w-xs input-sm"
                /> </label
              ><label class="form-control w-full max-w-xs">
                <div class="label">
                  <span class="label-text">價錢</span>
                </div>
                <input
                  type="number"
                  placeholder="請輸入價錢"
                  formControlName="price"
                  class="input input-bordered w-full max-w-xs input-sm input-primary"
                />
              </label>
            </div>
            <div class="flex gap-4">
              <label class="form-control w-full max-w-xs">
                <div class="label">
                  <span class="label-text">類型</span>
                </div>
                <select
                  class="select select-primary w-full max-w-xs select-sm"
                  formControlName="type"
                >
                  @for (type of types; track type.id) {
                    <option>{{ type.name }}</option>
                  }
                </select>
              </label>
              <label class="form-control w-full max-w-xs">
                <div class="label">
                  <span class="label-text">坪數</span>
                </div>
                <input
                  type="number"
                  placeholder="請輸入坪數"
                  formControlName="square"
                  class="input input-bordered w-full max-w-xs input-sm input-primary"
                />
              </label>
            </div>
            <div class="flex gap-4">
              <label class="form-control w-full max-w-xs">
                <div class="label">
                  <span class="label-text">樓層</span>
                </div>
                <input
                  type="number"
                  placeholder="請輸入樓層"
                  formControlName="floor"
                  class="input input-bordered w-full max-w-xs input-sm input-primary"
                />
              </label>
              <label class="form-control w-full max-w-xs">
                <div class="label">
                  <span class="label-text">總樓層</span>
                </div>
                <input
                  type="number"
                  placeholder="請輸入總樓層"
                  formControlName="totalFloor"
                  class="input input-bordered w-full max-w-xs input-sm input-primary"
                />
              </label>
            </div>
          </div>
        </div>
        <div class="pt-4">
          <div class="text-lg font-medium">位置資訊</div>
          <div class="flex gap-4">
            <label class="form-control w-full max-w-xs">
              <div class="label">
                <span class="label-text">校區</span>
              </div>
              <select
                class="select select-primary w-full max-w-xs select-sm"
                formControlName="campus"
              >
                @for (campus of campuses; track campus.id) {
                  <option>{{ campus.name }}</option>
                }
              </select> </label
            ><label class="form-control w-full max-w-xs">
              <div class="label">
                <span class="label-text">地址</span>
              </div>
              <input
                type="text"
                placeholder="請輸入地址"
                formControlName="address"
                class="input input-bordered w-full max-w-xs input-sm input-primary"
              />
            </label>
          </div>
        </div>
        <!-- <label class="form-control w-full max-w-xs">
          <div class="label">
            <span class="label-text">圖片</span>
          </div>
          <input
            type="file"
            placeholder="上傳圖片"
            formControlName="images"
            class="input input-bordered input-primary w-full max-w-xs input-sm"
          />
        </label> -->
        <div class="pt-4">
          <div class="text-lg font-medium">特色與設備</div>
          <div>
            <label class="form-control w-full max-w-xs">
              <div class="label">
                <span class="label-text">特色</span>
              </div>
              <select
                class="select select-primary w-full max-w-xs select-sm"
                formControlName="features"
              >
                @for (tag of tags; track tag.id) {
                  <option>{{ tag.name }}</option>
                }
              </select>
            </label>
            <div class="flex flex-col">
              <div class="label">
                <span class="label-text">設備</span>
              </div>
              <div class="flex gap-4">
                @for (facility of facilities; track facility.id) {
                  <div class="form-control">
                    <label class="cursor-pointer flex gap-2 items-center">
                      <input
                        type="checkbox"
                        checked="checked"
                        class="checkbox checkbox-primary"
                      /><span class="label-text">{{ facility.name }}</span>
                    </label>
                  </div>
                }
              </div>
            </div>
          </div>
        </div>

        <div class="pt-4">
          <div class="text-lg font-medium">介紹及規則</div>
          <div class="flex gap-4">
            <label class="form-control w-full max-w-xs">
              <div class="label">
                <span class="label-text">介紹</span>
              </div>
              <input
                type="text"
                placeholder="請輸入介紹"
                formControlName="description"
                class="input input-bordered w-full max-w-xs input-sm input-primary"
              />
            </label>
            <div formArrayName="rules">
              @for (
                ruleForm of rulesFormArray.controls;
                track ruleForm;
                let i = $index
              ) {
                <label class="form-control w-full max-w-xs" formControlName="i">
                  <div class="label">
                    <span class="label-text">規則</span>
                  </div>
                  <input
                    type="text"
                    placeholder="請輸入規則"
                    formControlName="rule"
                    class="input input-bordered w-full max-w-xs input-sm input-primary"
                  />
                </label>
              }
            </div>
          </div>
        </div>

        <div class="pt-4">
          <div class="text-lg font-medium">聯絡資訊</div>
          <div class="flex gap-4">
            <label class="form-control w-full max-w-xs">
              <div class="label">
                <span class="label-text">姓名</span>
              </div>
              <input
                type="text"
                placeholder="請輸入姓名"
                formControlName="username"
                class="input input-bordered w-full max-w-xs input-sm input-primary"
              />
            </label>
            <label class="form-control w-full max-w-xs">
              <div class="label">
                <span class="label-text">電話</span>
              </div>
              <input
                type="tel"
                placeholder="請輸入電話"
                formControlName="phone"
                class="input input-bordered w-full max-w-xs input-sm input-primary"
              />
            </label>

            <label class="form-control w-full max-w-xs">
              <div class="label">
                <span class="label-text">聯絡時間</span>
              </div>
              <input
                type="time"
                placeholder="請輸入聯絡時間"
                formControlName="contactTime"
                class="input input-bordered w-full max-w-xs input-sm input-primary"
              />
            </label>
          </div>
        </div>
      </form>
    </div>
  `,
  styles: [``],
  imports: [ReactiveFormsModule],
})
export class RentingEditComponent {
  tags = [
    {
      id: 1,
      name: '可養寵物',
    },
    {
      id: 2,
      name: '有陽台',
    },
    {
      id: 3,
      name: '可開伙',
    },
  ];

  campuses = [
    {
      id: 1,
      name: '自強校區',
    },
    {
      id: 2,
      name: '光復校區',
    },
    {
      id: 3,
      name: '成杏校區',
    },
  ];

  types = [
    {
      id: 1,
      name: '套房',
    },
    {
      id: 2,
      name: '雅房',
    },
    {
      id: 3,
      name: '整層住家',
    },
  ];

  facilities = [
    {
      id: 1,
      name: '冷氣',
    },
    {
      id: 2,
      name: '冰箱',
    },
    {
      id: 3,
      name: '洗衣機',
    },
  ];

  form = new FormGroup({
    title: new FormControl('', Validators.required),
    images: new FormControl('', Validators.required),
    features: new FormControl('', Validators.required),
    campus: new FormControl('', Validators.required),
    type: new FormControl('', Validators.required),
    square: new FormControl('', Validators.required),
    floor: new FormControl('', Validators.required),
    totalFloor: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    rules: new FormArray<FormGroup>([]),
    facilities: new FormControl('', Validators.required),
    username: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    contactTime: new FormControl('', Validators.required),
  });

  get rulesFormArray() {
    return this.form.controls['rules'];
  }

  createRuleGroup(params?: { rule: string }) {
    return new FormGroup({
      rule: new FormControl(params?.rule ?? '', [Validators.required]),
    });
  }

  addRuleGroup(formGroup: FormGroup) {
    this.rulesFormArray.push(formGroup);
  }

  submit() {
    if (this.form.invalid) return;

    console.log(this.form.getRawValue());
  }
}
