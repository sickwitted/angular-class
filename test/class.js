describe('Class', function() {
  it('Instantiates correctly', function() {

  });

  it('Can create child classes', function() {
    var Foo = Class.extend({
        baz: true,
        name: {},
        bar: function() {
          console.log(this.baz);
        }
      }),
      foo = new Foo(),
      _foo = new Foo({
        baz: false
      });

    expect(foo.baz).to.equal(true);
    expect(_foo.baz).to.equal(false);
  });

  it('Calls init when instantiating', function() {
    var Foo = Class.extend({
      findAll: function() {

      }
    },{
      init: function() {
        this.bar = true;
      }
    }),
    foo = new Foo();

    expect(foo.bar).to.equal(true);
    expect(Foo).to.have.property('findAll');
    expect(Foo.findAll.constructor.name).to.equal('Function');
  });
});