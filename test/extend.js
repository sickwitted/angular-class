describe('extend', function() {
  it('extends simple structures', function() {
    var o = {
      name: 'joe'
    };
    extend(o, {
      age: 15
    });
    expect(o.name).to.equal('joe');
    expect(o.age).to.equal(15);
  });

  it('recursively extends', function() {
    var o = {
      name: {
        value: 'Bob',
        required: true,
        foo: {
          bar: true
        }
      }
    };

    extend(o, {
      name: {
        required: false,
        foo: {
          count: 1
        },
        bar: {
          ref: 'foo.bar'
        }
      }
    }, {
      comments: [],
      fn: function Foo() {

      }
    });
    expect(o.name.value).to.equal('Bob');
    expect(o.name.required).to.equal(false);
    expect(o.fn).to.exist;
  });
});