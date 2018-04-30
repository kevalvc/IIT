

      // function FShape() {
      //   mxCylinder.call(this);
      // };
      //
      // mxUtils.extend(FShape, mxCylinder);
      //
      // FShape.prototype.extrude = 10;
      //
      // FShape.prototype.redrawPath = function(path, x, y, w, h, isForeground) {
      //   var dy = this.extrude * this.scale;
      //   var dx = this.extrude * this.scale;
      //
      //   if (isForeground) {
      //     path.moveTo(0, dy);
      //     path.lineTo(w - dx, dy);
      //     path.lineTo(w, 0);
      //     path.moveTo(w - dx, dy);
      //     path.lineTo(w - dx, h);
      //   } else {
      //     path.moveTo(0, dy);
      //     path.lineTo(dx, 0);
      //     path.lineTo(w, 0);
      //     path.lineTo(w, h - dy);
      //     path.lineTo(w - dx, h);
      //     path.lineTo(0, h);
      //     path.lineTo(0, dy);
      //     path.lineTo(dx, 0);
      //     path.close();
      //   }
      // };
      // mxCellRenderer.registerShape('box', FShape);
